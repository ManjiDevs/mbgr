from fastapi import FastAPI, UploadFile, File
from fastapi.responses import StreamingResponse
from rembg import remove
from io import BytesIO

app = FastAPI()

@app.post("/remove")
async def remove_bg(file: UploadFile = File(...)):
    image_data = await file.read()
    result = remove(image_data)

    return StreamingResponse(BytesIO(result), media_type="image/png")