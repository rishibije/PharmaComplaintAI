import re


def normalize_text(value):
    if not value:
        return ""

    value = str(value).lower()
    value = re.sub(r"[^a-z0-9\s]", " ", value)
    value = re.sub(r"\s+", " ", value)

    return value.strip()


def calculate_similarity(new_complaint, existing_complaint):
    score = 0
    total = 0

    fields = [
        ("product_name", 30),
        ("batch_number", 35),
        ("complaint_type", 15),
        ("description", 20),
    ]

    for field, weight in fields:
        new_value = normalize_text(
            new_complaint.get(field)
        )

        existing_value = normalize_text(
            existing_complaint.get(field)
        )

        if not new_value or not existing_value:
            continue

        total += weight

        if new_value == existing_value:
            score += weight

        elif field == "description":
            new_words = set(new_value.split())
            existing_words = set(existing_value.split())

            if new_words and existing_words:
                intersection = new_words.intersection(
                    existing_words
                )

                union = new_words.union(
                    existing_words
                )

                word_similarity = (
                    len(intersection) / len(union)
                )

                score += weight * word_similarity

    if total == 0:
        return 0

    return round((score / total) * 100, 2)


def find_duplicates(
    new_complaint,
    existing_complaints,
    threshold=70,
):
    matches = []

    for complaint in existing_complaints:
        existing_data = {
            "product_name": complaint.product_name,
            "batch_number": complaint.batch_number,
            "complaint_type": complaint.complaint_type,
            "description": complaint.description,
        }

        similarity = calculate_similarity(
            new_complaint,
            existing_data
        )

        if similarity >= threshold:
            matches.append({
                "complaint_id": complaint.id,
                "customer_name": complaint.customer_name,
                "product_name": complaint.product_name,
                "batch_number": complaint.batch_number,
                "complaint_type": complaint.complaint_type,
                "similarity": similarity,
            })

    matches.sort(
        key=lambda item: item["similarity"],
        reverse=True
    )

    return matches
