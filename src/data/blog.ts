export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    category: string;
    readTime: number;
    createdAt: string;
    views?: number;
    likes?: number;
}

export const blogPostsEn: BlogPost[] = [
    {
        id: "1",
        slug: "deploying-fastapi-with-docker",
        title: "Deploying FastAPI with Docker: A Production Guide",
        excerpt:
            "Learn how to containerize a FastAPI application, configure Nginx as a reverse proxy, and deploy it to a VPS with zero-downtime deployments.",
        content: `# Deploying FastAPI with Docker: A Production Guide

FastAPI is one of the fastest Python web frameworks available. When it comes to deploying it in production, Docker is the go-to choice for consistency, scalability, and ease of management.

## Prerequisites

- Python 3.11+
- Docker & Docker Compose
- A VPS (DigitalOcean, AWS, etc.)

## Step 1: Create the FastAPI App

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}
\`\`\`

## Step 2: Write the Dockerfile

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
\`\`\`

## Step 3: Docker Compose

\`\`\`yaml
version: "3.9"
services:
  api:
    build: .
    restart: always
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Step 4: Nginx Reverse Proxy

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

## Conclusion

With this setup, you get a production-ready FastAPI deployment with automatic restarts, reverse proxy, and database persistence.`,
        tags: ["Python", "FastAPI", "Docker", "DevOps", "Deployment"],
        category: "DevOps",
        readTime: 8,
        createdAt: "2025-01-15",
    },
    {
        id: "2",
        slug: "building-ai-chatbots-openai",
        title: "Building Production AI Chatbots with OpenAI",
        excerpt:
            "A deep-dive into building context-aware AI chatbots using the OpenAI API, covering prompt engineering, conversation memory, and cost optimization.",
        content: `# Building Production AI Chatbots with OpenAI

Building a chatbot demo is easy. Building one that works reliably in production — with context memory, cost control, and graceful failure handling — is an entirely different challenge.

## Architecture Overview

A production chatbot requires:
1. **Context Management** — remembering conversation history
2. **Prompt Engineering** — consistent, reliable outputs
3. **Rate Limiting** — respecting API quotas
4. **Cost Tracking** — monitoring token usage
5. **Fallback Handling** — graceful degradation

## Context Management with Redis

\`\`\`python
import redis
import json
from openai import OpenAI

client = OpenAI()
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def get_conversation(session_id: str) -> list:
    data = r.get(f"chat:{session_id}")
    return json.loads(data) if data else []

def save_conversation(session_id: str, messages: list):
    r.setex(f"chat:{session_id}", 3600, json.dumps(messages))

def chat(session_id: str, user_message: str) -> str:
    messages = get_conversation(session_id)
    messages.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            *messages[-10:]  # Keep last 10 messages to limit tokens
        ]
    )
    
    assistant_message = response.choices[0].message.content
    messages.append({"role": "assistant", "content": assistant_message})
    save_conversation(session_id, messages)
    
    return assistant_message
\`\`\`

## Prompt Engineering Tips

- Be explicit about output format
- Use few-shot examples for complex tasks
- Add constraints to prevent hallucinations
- Test edge cases systematically

## Cost Optimization

- Use GPT-3.5-turbo for simple queries, GPT-4 only when needed
- Implement token counting before sending requests
- Cache common responses with Redis
- Summarize old conversation history instead of truncating

## Conclusion

A production chatbot is a system design challenge as much as an AI challenge. Invest in the infrastructure around the model.`,
        tags: ["AI", "OpenAI", "Python", "Chatbot", "GPT-4"],
        category: "AI",
        readTime: 12,
        createdAt: "2025-02-20",
    },
    {
        id: "3",
        slug: "automating-workflows-python",
        title: "Automating Business Workflows with Python",
        excerpt:
            "How I automated a 4-hour daily manual process down to 5 minutes using Python, APIs, and smart scheduling.",
        content: `# Automating Business Workflows with Python

Every business has repetitive processes that humans do manually every day. Python is arguably the best tool for automating these workflows quickly and reliably.

## Identifying Automation Candidates

Good automation candidates share these traits:
- Rule-based (clear logic, no subjective judgment)
- Repetitive (done daily/weekly)
- High time cost
- Error-prone when done manually

## Building the Automation

\`\`\`python
import schedule
import time
import requests
import smtplib
from email.mime.text import MIMEText

def fetch_and_process_data():
    # Fetch from API
    response = requests.get(
        "https://api.example.com/data",
        headers={"Authorization": "Bearer YOUR_TOKEN"}
    )
    data = response.json()
    
    # Process
    processed = [
        {"id": item["id"], "value": item["value"] * 1.1}
        for item in data
        if item["status"] == "active"
    ]
    
    # Send report
    send_email_report(processed)
    print(f"Processed {len(processed)} records")

def send_email_report(data: list):
    msg = MIMEText(f"Processed {len(data)} records today.")
    msg["Subject"] = "Daily Report"
    msg["From"] = "automation@company.com"
    msg["To"] = "team@company.com"
    
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login("user", "app_password")
        server.send_message(msg)

# Schedule daily at 8 AM
schedule.every().day.at("08:00").do(fetch_and_process_data)

while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\`

## Deploying with Docker

Run your automation as a long-lived Docker container:

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "automation.py"]
\`\`\`

## Monitoring & Alerting

Always add monitoring:
- Log every run with timestamps
- Alert on failures via email/Slack
- Track execution time trends
- Store run history in a database

## Conclusion

Once you automate a few processes, you'll start seeing automation opportunities everywhere. Start small, monitor rigorously, and expand systematically.`,
        tags: ["Python", "Automation", "Business", "Productivity"],
        category: "Automation",
        readTime: 10,
        createdAt: "2025-03-05",
    },
    {
        id: "4",
        slug: "postgresql-performance-tuning",
        title: "PostgreSQL Performance Tuning for Backend Developers",
        excerpt:
            "Practical techniques for speeding up PostgreSQL queries: indexing strategies, query optimization, and connection pooling.",
        content: `# PostgreSQL Performance Tuning for Backend Developers

Slow database queries are one of the most common performance bottlenecks in web applications. Here are practical techniques to diagnose and fix them.

## Finding Slow Queries

Enable the slow query log:

\`\`\`sql
ALTER SYSTEM SET log_min_duration_statement = 1000; -- log queries > 1s
SELECT pg_reload_conf();
\`\`\`

Use \`EXPLAIN ANALYZE\` to understand query plans:

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123 ORDER BY created_at DESC LIMIT 10;
\`\`\`

## Indexing Strategies

\`\`\`sql
-- Composite index for common filter + sort patterns
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partial index for filtered queries
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- GIN index for JSONB columns
CREATE INDEX idx_metadata ON events USING GIN (metadata);
\`\`\`

## N+1 Query Prevention

\`\`\`sql
-- Instead of N+1 queries, use JOINs
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;
\`\`\`

## Connection Pooling with PgBouncer

Configure PgBouncer for transaction-mode pooling to handle thousands of concurrent connections efficiently.

## Conclusion

Database performance is about understanding your access patterns and building indexes to match them. Profile first, optimize second.`,
        tags: ["PostgreSQL", "Database", "Performance", "Backend"],
        category: "Backend",
        readTime: 9,
        createdAt: "2025-03-12",
    },
];


export const blogPostsTr: BlogPost[] = [
    {
        id: "1",
        slug: "deploying-fastapi-with-docker",
        title: "Docker ile FastAPI Dağıtımı: Üretim Rehberi",
        excerpt:
            "Bir FastAPI uygulamasını Docker ile nasıl kapsayıcılaştıracağınızı, Nginx'i ters vekil sunucu olarak nasıl yapılandıracağınızı ve sıfır kesinti ile bir sunucuya nasıl dağıtacağınızı öğrenin.",
        content: `# Deploying FastAPI with Docker: A Production Guide

FastAPI is one of the fastest Python web frameworks available. When it comes to deploying it in production, Docker is the go-to choice for consistency, scalability, and ease of management.

## Prerequisites

- Python 3.11+
- Docker & Docker Compose
- A VPS (DigitalOcean, AWS, etc.)

## Step 1: Create the FastAPI App

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
async def health():
    return {"status": "ok"}
\`\`\`

## Step 2: Write the Dockerfile

\`\`\`dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4"]
\`\`\`

## Step 3: Docker Compose

\`\`\`yaml
version: "3.9"
services:
  api:
    build: .
    restart: always
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/mydb
    depends_on:
      - db
  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Step 4: Nginx Reverse Proxy

\`\`\`nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://api:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
\`\`\`

## Conclusion

With this setup, you get a production-ready FastAPI deployment with automatic restarts, reverse proxy, and database persistence.`,
        tags: ["Python", "FastAPI", "Docker", "DevOps", "Deployment"],
        category: "DevOps",
        readTime: 8,
        createdAt: "2025-01-15",
    },
    {
        id: "2",
        slug: "building-ai-chatbots-openai",
        title: "Building Production AI Chatbots with OpenAI",
        excerpt:
            "A deep-dive into building context-aware AI chatbots using the OpenAI API, covering prompt engineering, conversation memory, and cost optimization.",
        content: `# Building Production AI Chatbots with OpenAI

Building a chatbot demo is easy. Building one that works reliably in production — with context memory, cost control, and graceful failure handling — is an entirely different challenge.

## Architecture Overview

A production chatbot requires:
1. **Context Management** — remembering conversation history
2. **Prompt Engineering** — consistent, reliable outputs
3. **Rate Limiting** — respecting API quotas
4. **Cost Tracking** — monitoring token usage
5. **Fallback Handling** — graceful degradation

## Context Management with Redis

\`\`\`python
import redis
import json
from openai import OpenAI

client = OpenAI()
r = redis.Redis(host='localhost', port=6379, decode_responses=True)

def get_conversation(session_id: str) -> list:
    data = r.get(f"chat:{session_id}")
    return json.loads(data) if data else []

def save_conversation(session_id: str, messages: list):
    r.setex(f"chat:{session_id}", 3600, json.dumps(messages))

def chat(session_id: str, user_message: str) -> str:
    messages = get_conversation(session_id)
    messages.append({"role": "user", "content": user_message})
    
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            *messages[-10:]  # Keep last 10 messages to limit tokens
        ]
    )
    
    assistant_message = response.choices[0].message.content
    messages.append({"role": "assistant", "content": assistant_message})
    save_conversation(session_id, messages)
    
    return assistant_message
\`\`\`

## Prompt Engineering Tips

- Be explicit about output format
- Use few-shot examples for complex tasks
- Add constraints to prevent hallucinations
- Test edge cases systematically

## Cost Optimization

- Use GPT-3.5-turbo for simple queries, GPT-4 only when needed
- Implement token counting before sending requests
- Cache common responses with Redis
- Summarize old conversation history instead of truncating

## Conclusion

A production chatbot is a system design challenge as much as an AI challenge. Invest in the infrastructure around the model.`,
        tags: ["AI", "OpenAI", "Python", "Chatbot", "GPT-4"],
        category: "AI",
        readTime: 12,
        createdAt: "2025-02-20",
    },
    {
        id: "3",
        slug: "automating-workflows-python",
        title: "Automating Business Workflows with Python",
        excerpt:
            "How I automated a 4-hour daily manual process down to 5 minutes using Python, APIs, and smart scheduling.",
        content: `# Automating Business Workflows with Python

Every business has repetitive processes that humans do manually every day. Python is arguably the best tool for automating these workflows quickly and reliably.

## Identifying Automation Candidates

Good automation candidates share these traits:
- Rule-based (clear logic, no subjective judgment)
- Repetitive (done daily/weekly)
- High time cost
- Error-prone when done manually

## Building the Automation

\`\`\`python
import schedule
import time
import requests
import smtplib
from email.mime.text import MIMEText

def fetch_and_process_data():
    # Fetch from API
    response = requests.get(
        "https://api.example.com/data",
        headers={"Authorization": "Bearer YOUR_TOKEN"}
    )
    data = response.json()
    
    # Process
    processed = [
        {"id": item["id"], "value": item["value"] * 1.1}
        for item in data
        if item["status"] == "active"
    ]
    
    # Send report
    send_email_report(processed)
    print(f"Processed {len(processed)} records")

def send_email_report(data: list):
    msg = MIMEText(f"Processed {len(data)} records today.")
    msg["Subject"] = "Daily Report"
    msg["From"] = "automation@company.com"
    msg["To"] = "team@company.com"
    
    with smtplib.SMTP("smtp.gmail.com", 587) as server:
        server.starttls()
        server.login("user", "app_password")
        server.send_message(msg)

# Schedule daily at 8 AM
schedule.every().day.at("08:00").do(fetch_and_process_data)

while True:
    schedule.run_pending()
    time.sleep(60)
\`\`\`

## Deploying with Docker

Run your automation as a long-lived Docker container:

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "automation.py"]
\`\`\`

## Monitoring & Alerting

Always add monitoring:
- Log every run with timestamps
- Alert on failures via email/Slack
- Track execution time trends
- Store run history in a database

## Conclusion

Once you automate a few processes, you'll start seeing automation opportunities everywhere. Start small, monitor rigorously, and expand systematically.`,
        tags: ["Python", "Automation", "Business", "Productivity"],
        category: "Automation",
        readTime: 10,
        createdAt: "2025-03-05",
    },
    {
        id: "4",
        slug: "postgresql-performance-tuning",
        title: "PostgreSQL Performance Tuning for Backend Developers",
        excerpt:
            "Practical techniques for speeding up PostgreSQL queries: indexing strategies, query optimization, and connection pooling.",
        content: `# PostgreSQL Performance Tuning for Backend Developers

Slow database queries are one of the most common performance bottlenecks in web applications. Here are practical techniques to diagnose and fix them.

## Finding Slow Queries

Enable the slow query log:

\`\`\`sql
ALTER SYSTEM SET log_min_duration_statement = 1000; -- log queries > 1s
SELECT pg_reload_conf();
\`\`\`

Use \`EXPLAIN ANALYZE\` to understand query plans:

\`\`\`sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE user_id = 123 ORDER BY created_at DESC LIMIT 10;
\`\`\`

## Indexing Strategies

\`\`\`sql
-- Composite index for common filter + sort patterns
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);

-- Partial index for filtered queries
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';

-- GIN index for JSONB columns
CREATE INDEX idx_metadata ON events USING GIN (metadata);
\`\`\`

## N+1 Query Prevention

\`\`\`sql
-- Instead of N+1 queries, use JOINs
SELECT u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON o.user_id = u.id
GROUP BY u.id, u.name;
\`\`\`

## Connection Pooling with PgBouncer

Configure PgBouncer for transaction-mode pooling to handle thousands of concurrent connections efficiently.

## Conclusion

Database performance is about understanding your access patterns and building indexes to match them. Profile first, optimize second.`,
        tags: ["PostgreSQL", "Veritabanı", "Performance", "Backend"],
        category: "Backend",
        readTime: 9,
        createdAt: "2025-03-12",
    },
];


export const getBlogPosts = (locale: string) => locale === "tr" ? blogPostsTr : blogPostsEn;
