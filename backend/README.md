#### (WINDOWS) Run the code in this directory:

```BASH
    python3 -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    python main.py
```

#### (DOCKER) Run the code in docker:

```BASH
    docker build -t tiktok/user_data:1.0 ./
    docker run -p 5001:5001 --name user_data_microservice tiktok/user_data:1.0
```