import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isDevelopementChain } from "../util";

const deployMocks: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  // If we are on a local development network, we need to deploy mocks!
  if (isDevelopementChain(chainId)) {
    log("Local network detected! Deploying mocks...");
    const linkToken = await deploy("LinkToken", { from: deployer, log: true });
    await deploy("VRFCoordinatorMock", {
      from: deployer,
      log: true,
      args: [linkToken.address],
    });
    await deploy("MockOracle", {
      from: deployer,
      log: true,
      args: [linkToken.address],
    });
    log("Mocks Deployed!");
    log("----------------------------------------------------");
  }
};

export default deployMocks;
export const tags = ["all", "mocks", "main"];
