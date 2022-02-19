import { Collectible } from "../typechain/Collectible";
import chai, { expect } from "chai";
import BN from "bn.js";
import chaiBn from "chai-bn";
// @ts-ignore
import skipIf from "mocha-skip-if";
import { network, deployments, ethers } from "hardhat";
import { developmentChains } from "../config";
chai.use(chaiBn(BN));

skipIf
  .if(developmentChains.includes(network.name))
  .describe("Collectible Tests", async () => {
    let collectible: Collectible;

    beforeEach(async () => {
      const Collectible = await deployments.get("Collectible");
      collectible = await ethers.getContractAt(
        "Collectible",
        Collectible.address
      );
    });

    it("Number of tokens should be increased", async () => {
      const transaction = await collectible.createCollectible();
      const tx_receipt = await transaction.wait();
      const counter = await collectible.tokenCounter();
      console.log("test", await collectible.tokenCounter());
      expect(counter).to.equal(1);

      // //wait 60 secs for oracle to callback
      // await new Promise((resolve) => setTimeout(resolve, 60000));

      // const result = await collectible.randomResult();
      // console.log(
      //   "VRF Result: ",
      //   new ethers.BigNumber.from(result._hex).toString()
      // );
      // expect(
      //   new ethers.BigNumber.from(result._hex).toString()
      // ).to.be.a.bignumber.that.is.greaterThan(
      //   new ethers.BigNumber.from(0).toString()
      // );
    });
  });
