FROM python:3.11-slim

WORKDIR /app

# Install project requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend application code
COPY backend/ .

# Command to run the FastApi application
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT
