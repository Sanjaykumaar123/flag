from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import json

app = FastAPI(title="ContextForge Qwen3-4B API")

# Step 2: Load Qwen3-4B Model
model_name = "Qwen/Qwen2.5-3B-Instruct" # Change to Qwen3-4B-Instruct when available

print(f"Loading {model_name}...")
try:
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModelForCausalLM.from_pretrained(
        model_name,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model, tokenizer = None, None

# Step 3: Define Generation Function
def generate_response(prompt: str):
    if not model or not tokenizer:
        raise Exception("Model not loaded.")

    inputs = tokenizer(prompt, return_tensors="pt").to(model.device)

    outputs = model.generate(
        **inputs,
        max_new_tokens=150,
        temperature=0.1,
        do_sample=False
    )

    # Extract only the generated tokens (ignoring the prompt)
    generated_tokens = outputs[0][inputs['input_ids'].shape[1]:]
    response = tokenizer.decode(generated_tokens, skip_special_tokens=True)
    return response

class ChunkRequest(BaseModel):
    text: str
    domain: str

# Step 5: Connect To Existing Backend
@app.post("/annotate")
async def annotate(req: ChunkRequest):
    try:
        # Step 7: Best Prompt Structure (ICL)
        prompt = f"""
<|im_start|>system
You are an expert NLP data annotation assistant.
Your task is to analyze the text and extract named entities.
Return ONLY valid JSON matching this exact schema:
{{
  "entities": [
    {{"name": "string", "type": "Monetary|Percentage|Date|Measurement|Organization|Relation"}}
  ]
}}
<|im_end|>
<|im_start|>user
Text: "{req.text}"
<|im_end|>
<|im_start|>assistant
"""
        
        result = generate_response(prompt)
        
        # Clean up markdown JSON formatting if present
        if "```json" in result:
            result = result.split("```json")[1].split("```")[0].strip()
        elif "```" in result:
            result = result.replace("```", "").strip()

        # Validate it's parseable JSON
        json_data = json.loads(result)
        
        return json_data
        
    except Exception as e:
        print(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
