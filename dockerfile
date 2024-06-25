FROM node:latest
FROM  mcr.microsoft.com/playwright:v1.44.0

WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY app/ python
COPY src/ src

ENV PATH /app/node_modules/.bin:$PATH

RUN npm ci

RUN npx playwright install --with-deps webkit
RUN npx playwright install --with-deps chromium
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    python3.10 \
    python3.10-venv \
    python3.10-dev \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1

RUN pip install -r python/requirements.txt

CMD ["python3", "python/bookstore_api.py"]
