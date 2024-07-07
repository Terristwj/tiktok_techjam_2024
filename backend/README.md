# User_Data_Microservice

## About

This microservice serves as an example use-case for encrypting data in the context of Machine Learning.

Data privacy is crucial, especially when dealing with training data that may contain sensitive information. Misuse of such data can lead to privacy breaches. To address this, the User_Data_Microservice encrypts data securely before using it for ML training, ensuring data privacy and compliance with ethical AI practices.

## How It Works

On startup, the User_Data_Microservice will train a machine learning model to recommend relevant videos based on a given `person_id`. The dataset used for training is sourced from an open-source Excel sheet.

### Process:

1. **Data Encryption:** Before the dataset is passed for model training, it is securely encrypted.
2. **Model Training:** The encrypted dataset is then used to train the ML model.
3. **Decryption:** The data is only decrypted when necessary, ensuring it remains secure during the entire process.

By following these steps, we ensure that user data privacy is maintained while leveraging machine learning algorithms for generating recommendations. This approach adheres to AI ethics and data governance principles.

### Dataset

[TikTok User Profiles Dataset](https://www.kaggle.com/datasets/manishkumar7432698/tiktok-profiles-data?resource=download)

This dataset contains profiles of TikTok users, which will be used to train the recommendation model.

### Usage

The User_Data_Microservice provides the following RESTful APIs:

1. Recommendation API

    - Endpoint: `/api/recommendation/<string:personId>`
    - Method: `GET`
    - Description: This API endpoint provides video recommendations based on the provided `personId`.

2. Health Check API

    - Endpoint: `/api/health`
    - Method: `GET`
    - Description: This API endpoint checks the health status of the microservice.

### Setup

#### (Windows) Run these commands in the user_data_microservice directory:

```bash
python3 -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
