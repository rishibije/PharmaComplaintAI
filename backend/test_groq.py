from backend.app.ai.llm import llm


response = llm.invoke(
    "Explain what a pharmaceutical customer complaint is in one sentence."
)


print("\n===== GROQ RESPONSE =====\n")
print(response.content)