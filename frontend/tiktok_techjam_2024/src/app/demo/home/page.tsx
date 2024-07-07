"use client";
import { useState, useEffect } from "react";
import {
    getSigner,
    getRecommendationLoggerContract,
} from "../../utils/ethereum";
import RecommendationLoggerABI from "../../../../contracts/RecommendationLogger.json"; // Ensure you have the ABI file
import { ethers } from "ethers";
import { Web3 } from "web3";

import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Link,
} from "@mui/material";

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: "videoURL", label: "Recommended Video", minWidth: 170 },
];

export default function Home({ videoURLs }: { videoURLs: string[] }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [account, setAccount] = useState<string | null>(null);
    const web3 = new Web3(window.ethereum);
    // const contract = new web3.eth.Contract(RecommendationLoggerABI, "0x888e2054bD09599FDeA97A564b90667098CE9f92")

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (typeof window.ethereum !== "undefined") {
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
            console.error(
                "User denied account access or MetaMask is not installed"
            );
        }
    };

    const logRecommendation = async () => {
        if (!account) {
            console.error("No account connected");
            return;
        }

        const signer = await getSigner();
        console.log(signer);
        const contractAddress = "0x888e2054bD09599FDeA97A564b90667098CE9f92"; // Replace with your contract address
        const contract = getRecommendationLoggerContract(
            signer,
            contractAddress,
            RecommendationLoggerABI.abi
        );
        console.log(contract);

        try {
            const recommendationHash = ethers.keccak256(
                ethers.toUtf8Bytes("Example Recommendation")
            );
            const verificationHash = ethers.keccak256(
                ethers.toUtf8Bytes("Verification Data")
            );
            const tx = await contract.logRecommendation(
                recommendationHash,
                verificationHash,
                "0x00"
            ); // Replace "0x00" with the zkProof
            await tx.wait();
            console.log("Recommendation logged:", tx);
        } catch (error) {
            console.error("Error logging recommendation:", error);
        }
    };

    return (
        <div
            className="px-5 py-8 
                max-w-3xl m-auto
                flex flex-col gap-2"
        >
            <h1 className="text-2xl">For Your Page</h1>

            <div>
                {account ? (
                    <p>Connected as {account}</p>
                ) : (
                    <button onClick={connectToMetaMask}>Connect Wallet</button>
                )}
                <button onClick={logRecommendation}>Log Recommendation</button>
            </div>

            <Paper className="border border-white w-full">
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videoURLs
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((videoURL, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={index}
                                        >
                                            {columns.map((column) => {
                                                const value = videoURL;
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        <Link
                                                            href={value}
                                                            target="_blank"
                                                            underline="hover"
                                                        >
                                                            {value}
                                                        </Link>
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={videoURLs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
