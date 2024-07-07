# Frontend

## About

This frontend codebase demonstrates a use-case for securely encrypting data for TikTok's For-You-Page (FYP). It works in conjunction with a Flask backend server to securely call for video recommendations while utilizing blockchain technology to prevent malicious data tampering.

## How It Works

This demo allows users to select from a pre-selectable dataset. Upon logging in, an API request is sent to the Flask backend server to securely retrieve recommended videos for FYP. Users can also securely log in with MetaMask to access the blockchain ecosystem, ensuring that data will not be tampered with. Using smart contracts, the data is stored securely on the blockchain.

### Process

1. **Dataset Selection:** Users select a dataset from a predefined buttons.
2. **Login:** Users log in to the frontend application.
3. **API Request:** An API request is sent to the Flask backend server to fetch video recommendations.
4. **Secure Retrieval:** The backend processes the request, generates the data from an encrypted trained ML model, and sends it back to the frontend.
5. **Blockchain Login:** Users log in with MetaMask to access the blockchain ecosystem.
6. **Data Storage:** Using smart contracts, the data is securely stored on the blockchain, ensuring integrity and preventing tampering.

### Usage

The frontend interacts with the backend and blockchain through the following key functionalities:

1. **Login:** Users log in to the application using their credentials.
2. **Fetch Recommendations:** Once logged in, the frontend sends a request to the backend to fetch video recommendations.
3. **MetaMask Integration:** Users can log in with MetaMask to interact with the blockchain.
4. **Blockchain Storage:** Video recommendation data is securely stored on the blockchain using smart contracts.

### Additional Information

1. Backend Setup:

    - Ensure the Flask backend server is running. Refer to the backend README for setup instructions.

2. MetaMask Installation:

    - Ensure MetaMask is installed in your browser for blockchain login functionality.

3. Smart Contracts:
    - The smart contracts used for data storage are located in the contracts directory. Deploy them to your preferred blockchain network.

### Setup

#### (Windows) Run these commands in the `tiktok_techjam_2024` directory:

```bash
npm install
npm run dev
```
