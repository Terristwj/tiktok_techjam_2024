import { deployContract } from "./utils";
import { ethers } from "ethers";

// An example of a basic deploy script
// It will deploy a CrowdfundingCampaign contract to selected network
// `parseEther` converts ether to wei, and `.toString()` ensures serialization compatibility.
export default async function () {
  // const contractArtifactName = "Verifier";
  // // const constructorArguments = [ethers.parseEther('.02').toString()];
  // await deployContract(contractArtifactName);

  //Deploy recommendation log
  const zkSyncAddress = "0xa0905C17306b2f8EC05a652fA82cbC3A2628962B"
  const contractArtifactName = "RecommendationLogger"
  const constructorArguments = [zkSyncAddress]
  await deployContract(contractArtifactName, constructorArguments)
}
