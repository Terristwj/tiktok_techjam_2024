"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getSigner, getRecommendationLoggerContract } from '../utils/ethereum';
import RecommendationLoggerABI from '../../../contracts/RecommendationLogger.json'; // Ensure you have the ABI file
import { ethers } from "ethers";
import { Web3 } from "web3";

export default function Home() {
    const router = useRouter();
    const [account, setAccount] = useState<string | null>(null);
    const web3 = new Web3(window.ethereum);
    // const contract = new web3.eth.Contract(RecommendationLoggerABI, "0x888e2054bD09599FDeA97A564b90667098CE9f92")

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const accounts = await provider.listAccounts();
                if (accounts.length > 0) {
                    setAccount(accounts.at(0)?.address);
                }
            } else {
                console.error("MetaMask is not installed");
            }
        };

        checkIfWalletIsConnected();
    }, []);

    const connectToMetaMask = async () => {
        try {
            const signer = await getSigner();
            const address = await signer.getAddress();
            setAccount(address);
        } catch (error) {
            console.error("User denied account access or MetaMask is not installed");
        }
    };

    const logRecommendation = async () => {
        if (!account) {
            console.error("No account connected");
            return;
        }

        const signer = await getSigner();
        console.log(signer)
        const contractAddress = "0x888e2054bD09599FDeA97A564b90667098CE9f92"; // Replace with your contract address
        const contract = getRecommendationLoggerContract(signer, contractAddress, RecommendationLoggerABI.abi);
        console.log(contract)

        try {
            const recommendationHash = ethers.keccak256(ethers.toUtf8Bytes("Example Recommendation"));
            const verificationHash = ethers.keccak256(ethers.toUtf8Bytes("Verification Data"));
            const tx = await contract.logRecommendation(recommendationHash, verificationHash, "0x00"); // Replace "0x00" with the zkProof
            await tx.wait();
            console.log("Recommendation logged:", tx);
        } catch (error) {
            console.error("Error logging recommendation:", error);
        }
    };

    return (
        <>
            <h1>For You</h1>
            {account ? (
                <p>Connected as {account}</p>
            ) : (
                <button onClick={connectToMetaMask}>Connect Wallet</button>
            )}
            <button onClick={logRecommendation}>Log Recommendation</button>
        </>
    );
}
