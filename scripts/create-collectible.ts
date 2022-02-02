import { ethers, deployments, getNamedAccounts } from "hardhat";

const main = async () => {
  const { deployer } = await getNamedAccounts();
  const Collectible = await deployments.get("Collectible");
  const collectible = await ethers.getContractAt(
    "Collectible",
    Collectible.address
  );

  const creationTx = await collectible.createCollectible({
    from: deployer,
  });
  await creationTx.wait(1);
  console.log(await collectible.tokenCounter());
};

main()
  .then(() => {
    console.log("Collectible created");
  })
  .catch((error) => console.error(error));
