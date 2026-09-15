import json
from typing import TypedDict

from langgraph.graph import StateGraph, START, END

from .llm import llm
from .prompts import (
    EXTRACTION_PROMPT,
    COMPLETENESS_PROMPT,
    RISK_PROMPT,
    SUMMARY_PROMPT,
    CAPA_PROMPT,
    ROOT_CAUSE_PROMPT,
)


class ComplaintState(TypedDict, total=False):
    raw_text: str
    complaint: dict
    completeness: dict
    risk: dict
    summary: str
    root_cause: dict
    capa: dict


def parse_json_response(content: str):
    content = content.strip()

    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")

    return json.loads(content.strip())


def extract_complaint(state: ComplaintState):
    prompt = (
        EXTRACTION_PROMPT
        + state["raw_text"]
    )

    response = llm.invoke(prompt)

    complaint = parse_json_response(
        response.content
    )

    return {
        "complaint": complaint
    }


def check_completeness(state: ComplaintState):
    complaint_json = json.dumps(
        state["complaint"],
        indent=2
    )

    prompt = (
        COMPLETENESS_PROMPT
        + complaint_json
    )

    response = llm.invoke(prompt)

    completeness = parse_json_response(
        response.content
    )

    return {
        "completeness": completeness
    }


def assess_risk(state: ComplaintState):
    complaint_json = json.dumps(
        state["complaint"],
        indent=2
    )

    prompt = (
        RISK_PROMPT
        + complaint_json
    )

    response = llm.invoke(prompt)

    risk = parse_json_response(
        response.content
    )

    return {
        "risk": risk
    }


def generate_summary(state: ComplaintState):
    data = {
        "complaint": state["complaint"],
        "risk": state["risk"]
    }

    prompt = (
        SUMMARY_PROMPT
        + json.dumps(
            data,
            indent=2
        )
    )

    response = llm.invoke(prompt)

    return {
        "summary": response.content
    }


def analyze_root_cause(state: ComplaintState):
    data = {
        "complaint": state["complaint"],
        "risk": state["risk"]
    }

    response = llm.invoke(
        ROOT_CAUSE_PROMPT
        + json.dumps(
            data,
            indent=2
        )
    )

    root_cause = parse_json_response(
        response.content
    )

    return {
        "root_cause": root_cause
    }


def recommend_capa(state: ComplaintState):
    data = {
        "complaint": state["complaint"],
        "risk": state["risk"]
    }

    response = llm.invoke(
        CAPA_PROMPT
        + json.dumps(
            data,
            indent=2
        )
    )

    capa = parse_json_response(
        response.content
    )

    return {
        "capa": capa
    }


builder = StateGraph(
    ComplaintState
)


builder.add_node(
    "extract_complaint",
    extract_complaint
)

builder.add_node(
    "check_completeness",
    check_completeness
)

builder.add_node(
    "assess_risk",
    assess_risk
)

builder.add_node(
    "generate_summary",
    generate_summary
)

builder.add_node(
    "analyze_root_cause",
    analyze_root_cause
)

builder.add_node(
    "recommend_capa",
    recommend_capa
)


builder.add_edge(
    START,
    "extract_complaint"
)

builder.add_edge(
    "extract_complaint",
    "check_completeness"
)

builder.add_edge(
    "check_completeness",
    "assess_risk"
)

builder.add_edge(
    "assess_risk",
    "generate_summary"
)

builder.add_edge(
    "generate_summary",
    "analyze_root_cause"
)

builder.add_edge(
    "analyze_root_cause",
    "recommend_capa"
)

builder.add_edge(
    "recommend_capa",
    END
)


complaint_graph = builder.compile()