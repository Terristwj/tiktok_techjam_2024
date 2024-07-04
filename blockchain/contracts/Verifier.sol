// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

interface IZkSync {
    function verifyProof(bytes memory proof) external view returns (bool);
}

contract Verifier {
    IZkSync public zkSync;

    event ProofVerified(address indexed user, bytes32 proofHash);

    constructor(address _zkSyncAddress) {
        zkSync = IZkSync(_zkSyncAddress);
    }

    function verifyProof(bytes memory proof) public returns (bool) {
        bool isValid = zkSync.verifyProof(proof);
        require(isValid, "Invalid zk-proof");

        bytes32 proofHash = keccak256(proof);
        emit ProofVerified(msg.sender, proofHash);
        return true;
    }
}

