import { ethers } from "ethers";
import { task } from "hardhat/config";

const network = process.env.NETWORK;
const provider = ethers.getDefaultProvider(network);

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = ethers.utils.getAddress(taskArgs.account);
    const balance = await provider.getBalance(account);

    console.log(ethers.utils.formatEther(balance), "ETH");
  });

export default {};
