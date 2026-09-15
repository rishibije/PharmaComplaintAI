from datetime import datetime

from sqlalchemy import Column, Integer, String, Text, DateTime

from .database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    complaint_source = Column(String(100), nullable=True)
    customer_name = Column(String(255), nullable=True)

    product_name = Column(String(255), nullable=True)
    product_strength = Column(String(100), nullable=True)
    batch_number = Column(String(100), nullable=True)

    manufacturing_date = Column(String(50), nullable=True)
    expiry_date = Column(String(50), nullable=True)

    complaint_type = Column(String(150), nullable=True)
    complaint_date = Column(String(50), nullable=True)

    description = Column(Text, nullable=True)

    severity = Column(String(50), nullable=True)
    priority = Column(String(50), nullable=True)

    risk_level = Column(String(50), nullable=True)
    risk_reason = Column(Text, nullable=True)

    completeness_score = Column(Integer, nullable=True)
    is_sufficient = Column(String(10), nullable=True)

    summary = Column(Text, nullable=True)
    capa_recommendation = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
