import chai from "chai";
import { expect } from "chai";
import skipIf from "mocha-skip-if";
import BN from "bn.js";
import { network, deployments, ethers } from "hardhat";
import {Deployment} "@hardhat/types"
chai.use(require("chai-bn")(BN));
import { developmentChains } from "../../config";

skipIf
  .if(developmentChains.includes(network.name))
  .describe("RandomNumberConsumer Integration Tests", async function () {
    let collectible: Deployment;

    beforeEach(async () => {
      const Collectible = await deployments.get("Collectible");
      collectible = await ethers.getContractAt(
        "Collectible",
        Collectible.address
      );
    });

    it("Should successfully make a VRF request and get a result", async () => {
      const transaction = await collectible.getRandomNumber();
      const tx_receipt = await transaction.wait();
      const requestId = tx_receipt.events[2].topics[1];

      //wait 60 secs for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 60000));

      const result = await collectible.randomResult();
      console.log(
        "VRF Result: ",
        new ethers.BigNumber.from(result._hex).toString()
      );
      expect(
        new ethers.BigNumber.from(result._hex).toString()
      ).to.be.a.bignumber.that.is.greaterThan(
        new ethers.BigNumber.from(0).toString()
      );
    });
  });
