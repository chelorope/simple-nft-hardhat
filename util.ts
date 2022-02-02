import networkConfig, { developmentChains } from "./config";

export const isDevelopementChain = (chainId: string) => {
  return developmentChains.indexOf(networkConfig[chainId].name) !== -1;
};

export const getNetworkIdFromName = async (networkIdName: string) => {
  for (const id in networkConfig) {
    if (networkConfig[id].name === networkIdName) {
      return id;
    }
  }
  return null;
};

export const sleep = async (time: number /* in seconds */) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time * 1000);
  });
};
