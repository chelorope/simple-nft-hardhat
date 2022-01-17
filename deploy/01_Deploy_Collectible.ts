import networkConfig from "../config";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isDevelopementChain } from "../scripts/util";

const deployCollectible: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) => {
  const { deploy, get, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  const CONFIG = networkConfig[chainId];
  let linkTokenAddress;
  let vrfCoordinatorAddress;
  let additionalMessage = "";

  log("CHAIN ID: ", chainId);
  if (isDevelopementChain(chainId)) {
    const linkToken = await get("LinkToken");
    log("LINK TOKEN: ", linkToken);
    const VRFCoordinatorMock = await get("VRFCoordinatorMock");
    linkTokenAddress = linkToken.address;
    vrfCoordinatorAddress = VRFCoordinatorMock.address;
    additionalMessage = " --linkaddress " + linkTokenAddress;
  } else {
    linkTokenAddress = CONFIG.linkToken;
    vrfCoordinatorAddress = CONFIG.vrfCoordinator;
  }
  const keyHash = CONFIG.keyHash;
  const fee = CONFIG.fee;

  const collectible = await deploy("Collectible", {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true,
  });

  log("Run the following command to fund contract with LINK:");
  log(
    "npx hardhat fund-link --contract " +
      collectible.address +
      " --network " +
      CONFIG.name +
      additionalMessage
  );
  log("Then run Collectible contract with the following command");
  log(
    "npx hardhat collectible --contract " +
      collectible.address +
      " --network " +
      CONFIG.name
  );
  log("----------------------------------------------------");
};

export default deployCollectible;
export const tags = ["all", "vrf"];
