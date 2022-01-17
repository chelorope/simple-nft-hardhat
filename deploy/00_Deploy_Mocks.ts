import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { isDevelopementChain } from "../scripts/util";

const deployMocks: DeployFunction = async ({
  getNamedAccounts,
  deployments,
  getChainId,
}: HardhatRuntimeEnvironment) => {
  const DECIMALS = "18";
  const INITIAL_PRICE = "200000000000000000000";
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
    // await deploy("EthUsdAggregator", {
    //   contract: "MockV3Aggregator",
    //   from: deployer,
    //   log: true,
    //   args: [DECIMALS, INITIAL_PRICE],
    // });
    // await deploy("MockOracle", {
    //   from: deployer,
    //   log: true,
    //   args: [linkToken.address],
    // });
    log("Mocks Deployed!");
    log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    log(
      "You are deploying to a local network, you'll need a local network running to interact"
    );
    log(
      "Please run `npx hardhat console` to interact with the deployed smart contracts!"
    );
    log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }
};

export default deployMocks;
export const tags = ["all", "mocks", "main"];
