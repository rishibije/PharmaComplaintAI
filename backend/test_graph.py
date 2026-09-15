from backend.app.ai.graph import complaint_graph


complaint = """
Customer Name: ABC Pharmaceuticals Pvt Ltd

Complaint Source: Customer Email

Product Name: Paracetamol Tablets

Product Strength: 500 mg

Batch Number: PCM24081

Manufacturing Date: 15 August 2026

Expiry Date: July 2028

Complaint Date: 10 September 2026

Complaint Type: Product Appearance

Complaint Description:

The customer reported that approximately 20 tablets
from the received batch had brownish discoloration.
The remaining tablets appeared normal.

The customer has requested an investigation
and replacement of the affected quantity.
"""


result = complaint_graph.invoke({

    "raw_text": complaint

})


print("\n==============================")
print("EXTRACTED COMPLAINT")
print("==============================")

print(
    result["complaint"]
)


print("\n==============================")
print("COMPLETENESS")
print("==============================")

print(
    result["completeness"]
)


print("\n==============================")
print("RISK ASSESSMENT")
print("==============================")

print(
    result["risk"]
)


print("\n==============================")
print("SUMMARY")
print("==============================")

print(
    result["summary"]
)