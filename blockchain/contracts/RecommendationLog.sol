// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./Verifier.sol";

contract RecommendationLogger {
    Verifier public verifier;

    struct Recommendation {
        address user;
        uint256 timestamp;
        string recommendationHash;
        bytes32 verificationHash;
    }

    Recommendation[] public recommendations;

    event RecommendationLogged(address indexed user, uint256 timestamp, string recommendationHash, bytes32 verificationHash);

    constructor(address _verifier) {
        verifier = Verifier(_verifier);
    }

    function logRecommendation(string memory _recommendationHash, bytes32 _verificationHash, bytes memory zkProof) public {
        require(verifier.verifyProof(zkProof), "Invalid zk-proof");
        recommendations.push(Recommendation(msg.sender, block.timestamp, _recommendationHash, _verificationHash));
        emit RecommendationLogged(msg.sender, block.timestamp, _recommendationHash, _verificationHash);
    }
}
