# TikTok TeckJam 2024

## Team Lockerism

## Problem Statement

Come up with scenarios or use cases where PETs, including but not limited to PSI, SMPC, DP, homomorphic encryption and cryptography, can help improve privacy protection. Create a proof of concept with an open source library to demonstrate the idea.

### Background

Privacy is increasingly recognized and valued across cultures and societies in the era of digitalization and big data. While numerous applications are empowered by data collaboration on a large scale, individuals are more and more inclined to take back control of their personal data. The recent guidance published by the Information Commissioner's Office UK is urging organizations to deploy privacy-enhancing technologies (PETS) when sharing personal information to ensure such data's safety, security, and anonymity. The Infocomm Media Development Authority (IMDA) and Personal Data Protection Commission (PDPC) launched the first PET Sandbox in Singapore on July 2022 to support piloting PET projects that address common business challenges in protecting regulated data (personal, financial, healthcare). Overall, the uptake of PETS is accelerating globally. Among the various PETs, cryptography-related techniques (homomorphic encryption, secure multiparty computation, private set intersection, etc.) play a vital role. These techniques provide precise and provable privacy guarantees while maintaining the ability to gain insights from sensitive datasets.

## About

This project demonstrates a secure data encryption use-case for TikTok's For-You-Page (FYP), leveraging both backend and frontend components. The backend handles data encryption and machine learning model training, while the frontend interacts with the backend and integrates blockchain technology to ensure data integrity and prevent tampering.

## Project Structure

### Backend

The backend microservice encrypts data securely before using it for ML training, ensuring data privacy and compliance with ethical AI practices. It uses a Flask server to provide APIs for video recommendations.

#### Key Features

-   **Data Encryption:** Securely encrypts the dataset before model training.
-   **Model Training:** Trains an ML model to recommend videos based on user profiles.
-   **APIs:** Provides endpoints for fetching video recommendations and health checks.

### Frontend

The frontend codebase demonstrates secure data retrieval for TikTok's FYP. It integrates with the Flask backend to call for video recommendations and uses blockchain technology to prevent data tampering.

#### Key Features

-   **User Interaction:** Allows users to select datasets and log in to the application.
-   **API Integration:** Sends requests to the backend to fetch video recommendations.
-   **Blockchain Integration:** Allows users to log in with MetaMask and store data securely on the blockchain using smart contracts.

## Development Tools

-   **VSCode (IDE):** Used for writing and managing code.
-   **Postman (API Testing):** Used for testing and verifying API endpoints.

## APIs Used

-   **Internal APIs:** Developed within the project to handle video recommendations and health checks.

## Assets Used

-   **TikTok User Profiles Dataset:** Sourced from [Kaggle](https://www.kaggle.com/datasets/manishkumar7432698/tiktok-profiles-data?resource=download), this dataset contains profiles of TikTok users used to train the recommendation model.

## Libraries Used

### Backend Libraries

-   **Flask:** A lightweight WSGI web application framework in Python used for building the backend server.
-   **numpy:** A fundamental package for scientific computing with Python, used for numerical operations.
-   **pandas:** A data manipulation and analysis library for Python, used for handling and processing the dataset.
-   **scikit-learn:** A machine learning library for Python, used for training the recommendation model.

### Frontend Libraries

-   **NextJS:** A React framework for building server-side rendered and static web applications.
-   **MUI Components:** A popular React UI framework that provides pre-designed components for building user interfaces.
-   **ethers:** A library for interacting with the Ethereum blockchain and its ecosystem.
-   **web3:** A JavaScript library for interacting with the Ethereum blockchain, used for integrating blockchain functionality.

## Additional Components

### MetaMask

MetaMask is a browser extension that allows users to interact with the Ethereum blockchain. In this project, it is used for user authentication and secure interaction with smart contracts.

### Smart Contracts

Smart contracts are self-executing contracts with the terms of the agreement directly written into code. In this project, smart contracts are used to securely store video recommendation data on the blockchain, ensuring data integrity and preventing tampering.

### Blockchain

Blockchain technology is used to create a secure and immutable record of video recommendation data. By leveraging blockchain, the project ensures that data cannot be tampered with, providing an additional layer of security and trust.

## Setup and Usage

### Backend

Follow the instructions in the [Backend README](backend/README.md) to set up and run the backend server.

### Frontend

Follow the instructions in the [Frontend README](frontend/README.md) to set up and run the frontend application.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or suggestions, please open an issue or contact us at support@example.com.
