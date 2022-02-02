import { ethers, getNamedAccounts, deployments } from "hardhat";
enum Artwork {
  TWO_OWLS = 0,
  DOGS_HEAD = 1,
  DECEMBER_CAT = 2,
}

const URIS = {
  [Artwork.TWO_OWLS]:
    "https://ipfs.io/ipfs/QmbdquQfd6UYL7AoVGxZfHvWWuEpPMxHgJKEXNuKitCm82",
  [Artwork.DOGS_HEAD]:
    "https://ipfs.io/ipfs/QmdVUe5im2pKSJZoXXrrSkH4sPms3B56GwUAe7zecrESh1",
  [Artwork.DECEMBER_CAT]:
    "https://ipfs.io/ipfs/QmcXMkqvU1wx21542LuvkGEDbKqEgpAVNYTb9K5i7L4MYG",
};

const main = async () => {
  const { deployer } = await getNamedAccounts();
  const Collectible = await deployments.get("Collectible");
  const collectible = await ethers.getContractAt(
    "Collectible",
    Collectible.address
  );

  // REPLACEMENT_UNDERPRICED error workaround: https://github.com/ethers-io/ethers.js/issues/435
  let baseNonce = ethers.provider.getTransactionCount(deployer);
  let nonceOffset = 0;
  async function getNonce() {
    return baseNonce.then((nonce) => nonce + nonceOffset++);
  }

  await Promise.all(
    (Object.keys(URIS) as unknown as Array<keyof typeof URIS>).map(
      async (key) => {
        const creationTx = await collectible.setArtworkURI(key, URIS[key], {
          nonce: await getNonce(),
        });
        return creationTx.wait(1);
      }
    )
  );
};

main()
  .then(() => {
    console.log("Artwork URIs assigned");
  })
  .catch((error) => {
    console.error(error);
  });
