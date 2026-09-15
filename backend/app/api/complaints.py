import io
import json

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pypdf import PdfReader

from ..ai.graph import complaint_graph
from ..ai.duplicate import find_duplicates
from ..database import SessionLocal
from ..models import Complaint


router = APIRouter()


def extract_pdf_text(file_bytes: bytes) -> str:
    reader = PdfReader(io.BytesIO(file_bytes))

    pages = []

    for page in reader.pages:
        text = page.extract_text()

        if text:
            pages.append(text)

    return "\n".join(pages)


@router.post("/analyze")
async def analyze_complaint(
    text: str = Form(""),
    file: UploadFile | None = File(None),
):
    raw_text = text.strip()

    complaint_source = "Complaint Text"

    if file:
        contents = await file.read()
        filename = (file.filename or "").lower()

        if filename.endswith(".pdf"):
            raw_text = extract_pdf_text(contents)
            complaint_source = "Uploaded PDF"

        elif filename.endswith(".txt"):
            raw_text = contents.decode(
                "utf-8",
                errors="ignore"
            )
            complaint_source = "Uploaded TXT"

        else:
            raise HTTPException(
                status_code=400,
                detail="Only PDF and TXT files are supported."
            )

    if not raw_text:
        raise HTTPException(
            status_code=400,
            detail="Please provide complaint text or upload a PDF/TXT file."
        )

    result = complaint_graph.invoke({
        "raw_text": raw_text
    })

    complaint_data = result["complaint"]
    completeness_data = result["completeness"]
    risk_data = result["risk"]
    summary_data = result["summary"]
    root_cause_data = result["root_cause"]
    capa_data = result["capa"]

    # Store the actual input source in the complaint data
    # so the frontend can display it correctly.
    complaint_data["complaint_source"] = complaint_source

    db = SessionLocal()

    try:
        existing_complaints = (
            db.query(Complaint)
            .order_by(Complaint.created_at.desc())
            .all()
        )

        duplicate_matches = find_duplicates(
            complaint_data,
            existing_complaints,
            threshold=70,
        )

    finally:
        db.close()

    duplicate_data = {
        "is_duplicate": len(duplicate_matches) > 0,
        "matches": duplicate_matches,
    }

    db = SessionLocal()

    try:
        complaint_record = Complaint(
            complaint_source=(
                complaint_data.get("complaint_source")
                or complaint_source
            ),

            customer_name=complaint_data.get(
                "customer_name"
            ),

            product_name=complaint_data.get(
                "product_name"
            ),

            product_strength=complaint_data.get(
                "product_strength"
            ),

            batch_number=complaint_data.get(
                "batch_number"
            ),

            manufacturing_date=complaint_data.get(
                "manufacturing_date"
            ),

            expiry_date=complaint_data.get(
                "expiry_date"
            ),

            complaint_type=complaint_data.get(
                "complaint_type"
            ),

            complaint_date=complaint_data.get(
                "complaint_date"
            ),

            description=complaint_data.get(
                "description"
            ),

            severity=(
                risk_data.get("severity")
                or complaint_data.get("severity")
            ),

            priority=(
                risk_data.get("priority")
                or complaint_data.get("priority")
            ),

            risk_level=risk_data.get(
                "risk_level"
            ),

            risk_reason=risk_data.get(
                "reason"
            ),

            completeness_score=(
                completeness_data.get("score")
            ),

            is_sufficient=str(
                completeness_data.get(
                    "is_sufficient",
                    False
                )
            ),

            summary=summary_data,

            capa_recommendation=json.dumps(
                capa_data
            ),
        )

        db.add(complaint_record)

        db.commit()

        db.refresh(complaint_record)

        complaint_id = complaint_record.id

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()

    return {
        "complaint_id": complaint_id,
        "complaint": complaint_data,
        "completeness": completeness_data,
        "risk": risk_data,
        "summary": summary_data,
        "root_cause": root_cause_data,
        "duplicate": duplicate_data,
        "capa": capa_data,
    }


@router.get("/")
def get_complaints():
    db = SessionLocal()

    try:
        complaints = (
            db.query(Complaint)
            .order_by(Complaint.created_at.desc())
            .all()
        )

        return [
            {
                "id": complaint.id,
                "customer_name": complaint.customer_name,
                "product_name": complaint.product_name,
                "batch_number": complaint.batch_number,
                "complaint_type": complaint.complaint_type,
                "risk_level": complaint.risk_level,
                "severity": complaint.severity,
                "priority": complaint.priority,
                "complaint_date": complaint.complaint_date,
                "created_at": complaint.created_at,
            }
            for complaint in complaints
        ]

    finally:
        db.close()
