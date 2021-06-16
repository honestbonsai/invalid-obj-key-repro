require("dotenv").config(); // eslint-disable-line
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import { task, HardhatUserConfig } from "hardhat/config";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn moreww
const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      chainId: 1,
      // chainId: 1337,
      forking: {
        enabled: true,
        url: process.env["RPC_URL"]
          ? process.env["RPC_URL"]
          : "http://127.0.0.1:8545",
      },
      blockGasLimit: 20000000,
      allowUnlimitedContractSize: true,
    },
  },
  mocha: {
    timeout: 1200000,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
