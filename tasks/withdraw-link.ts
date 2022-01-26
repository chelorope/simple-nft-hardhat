// import networkConfig from "../config";
// import { getNetworkIdFromName } from "../scripts/util";
// import { task } from "hardhat/config";

// task("withdraw-link", "Returns any LINK left in deployed contract")
//   .addParam("contract", "The address of the contract")
//   .addOptionalParam("linkaddress", "Set the LINK token address")
//   .setAction(async (taskArgs, hre) => {
//     const contractAddr = taskArgs.contract;
//     let networkId: number | "default" =
//       Number(await getNetworkIdFromName(hre.network.name)) || "default";

//     if (networkId === null) {
//       console.log("Missing network Id");
//       return;
//     }

//     //Get signer information
//     const accounts = await hre.ethers.getSigners();
//     const signer = accounts[0];

//     //First, lets see if there is any LINK to withdraw
//     const linkTokenAddress =
//       networkConfig[networkId]["linkToken"] || taskArgs.linkaddress;
//     const LinkToken = await hre.ethers.getContractFactory("LinkToken");
//     const linkTokenContract = new hre.ethers.Contract(
//       linkTokenAddress,
//       LinkToken.interface,
//       signer
//     );
//     const balanceHex = await linkTokenContract.balanceOf(contractAddr);
//     const balance = Number(await hre.ethers.BigNumber.from(balanceHex._hex));
//     console.log(
//       "LINK balance of contract: " +
//         contractAddr +
//         " is " +
//         balance / Math.pow(10, 18)
//     );

//     if (balance > 0) {
//       //Could also be Any-API contract, but in either case the function signature is the same, so we just need to use one
//       const RandomNumberConsumer = await hre.ethers.getContractFactory(
//         "RandomNumberConsumer"
//       );

//       //Create connection to Consumer Contract and call the withdraw function
//       const ConsumerContract = new hre.ethers.Contract(
//         contractAddr,
//         RandomNumberConsumer.interface,
//         signer
//       );
//       const result = await ConsumerContract.withdrawLink();
//       console.log(
//         "All LINK withdrew from contract " + contractAddr,
//         ". Transaction Hash: ",
//         result.hash
//       );
//     } else {
//       console.log("Contract doesn't have any LINK to withdraw");
//     }
//   });
