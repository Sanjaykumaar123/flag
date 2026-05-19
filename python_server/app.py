from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM
import json
import os

app = FastAPI(title="ContextForge Qwen3-4B API")

# Model configuration
# Note: Swap this to "Qwen/Qwen3-4B-Instruct" when the weights are available.
MODEL_NAME = "Qwen/Qwen2.5-3B-Instruct" 

print(f"Loading {MODEL_NAME}...")
try:
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model (this is normal if you haven't downloaded it yet): {e}")
    model, tokenizer = None, None

class ChunkRequest(BaseModel):
    text: string
    domain: string

@app.post("/annotate")
async def annotate_chunk(req: ChunkRequest):
    if not model or not tokenizer:
        raise HTTPException(status_code=503, detail="Model not loaded. Check GPU/Dependencies.")

    # Adaptive Few-Shot In-Context Learning (ICL) Prompt
    prompt = f"""
<|im_start|>system
You are an expert NLP data annotation assistant.
Your task is to analyze the text and extract named entities, sentiment, and the specific label.
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
    try:
        inputs = tokenizer(prompt, return_tensors="pt").to(model.device)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=150,
                temperature=0.1,
                do_sample=False
            )
            
        # Extract only the newly generated tokens
        generated_tokens = outputs[0][inputs['input_ids'].shape[1]:]
        response = tokenizer.decode(generated_tokens, skip_special_tokens=True)
        
        # Clean up markdown JSON formatting if present
        if "```json" in response:
            response = response.split("```json")[1].split("```")[0].strip()
        elif "```" in response:
            response = response.replace("```", "").strip()

        # Validate it's parseable JSON
        json_data = json.loads(response)
        
        return json_data
        
    except Exception as e:
        print(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
