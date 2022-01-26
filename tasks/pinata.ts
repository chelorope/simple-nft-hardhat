import fs from "fs";
import axios from "axios";
import { task } from "hardhat/config";
import FormData from "form-data";

const PINATA_PIN_URL = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
const FILES_PATH = "./files/";

task("pinata", "Prints an account's balance")
  .addParam("filename", "Name of the file to pin on Pinata")
  .setAction(async (taskArgs) => {
    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append(
      "file",
      fs.createReadStream(FILES_PATH + taskArgs.filename) as unknown as string
    );

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
      name: taskArgs.filename,
    });
    data.append("pinataMetadata", metadata);

    //pinataOptions are optional
    // const pinataOptions = JSON.stringify({
    //   cidVersion: 0,
    //   customPinPolicy: {
    //     regions: [
    //       {
    //         id: "FRA1",
    //         desiredReplicationCount: 1,
    //       },
    //       {
    //         id: "NYC1",
    //         desiredReplicationCount: 2,
    //       },
    //     ],
    //   },
    // });
    // data.append("pinataOptions", pinataOptions);

    return axios
      .post(PINATA_PIN_URL, data, {
        // @ts-ignore
        maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
        headers: {
          // @ts-ignore
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: process.env.PINATA_API_KEY,
          pinata_secret_api_key: process.env.PINATA_API_SECRET,
        },
      })
      .then(function (response) {
        console.log("PINATA RESPONSE", response.data);
      })
      .catch(function (error) {
        console.error("ERROR", error.message);
      });
  });
