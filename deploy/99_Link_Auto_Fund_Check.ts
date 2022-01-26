import { ethers, run } from "hardhat";
import networkConfig from "../config";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isDevelopementChain, autoFundCheck } from "../scripts/util";

const fundWithLink: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log, get } = deployments;
  const chainId = await getChainId();
  let linkTokenAddress, oracle;
  let additionalMessage = "";
  const CONFIG = networkConfig[chainId];
  const networkName = CONFIG.name;
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR);

  if (isDevelopementChain(chainId)) {
    const linkToken = await get("LinkToken");
    const MockOracle = await get("MockOracle");
    linkTokenAddress = linkToken.address;
    oracle = MockOracle.address;
    additionalMessage = " --linkaddress " + linkTokenAddress;
  } else {
    linkTokenAddress = CONFIG.linkToken;
    oracle = CONFIG.oracle;
  }

  // Auto-fund VRFConsumer contract

  const Collectible = await deployments.get("Collectible");
  const CollectibleContract = await ethers.getContractAt(
    "Collectible",
    Collectible.address
  );

  if (
    await autoFundCheck(
      CollectibleContract.address,
      networkName,
      linkTokenAddress,
      additionalMessage
    )
  ) {
    await run("fund-link", {
      contract: CollectibleContract.address,
      linkaddress: linkTokenAddress,
    });
  } else {
    log("Then run Collectible contract with the following command:");
    log(
      "npx hardhat request-random-number --contract " +
        CollectibleContract.address +
        " --network " +
        networkName
    );
  }
  log("----------------------------------------------------");
};

export default fundWithLink;
export const tags = ["all"];
