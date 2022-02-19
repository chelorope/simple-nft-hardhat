# Simple NFT using Chainlink VRF

Sample NFT contract deployment and test using Hardhat framewok

# Deploy

`npx hardhat deploy`

# Tasks

`npx hardhat <task>`

Available tasks:

```shell
  accounts Prints the list of accounts
  balance Prints an account's balance
  block-number Prints the current block number
  check Check whatever you need
  clean Clears the cache and deletes all artifacts
  compile Compiles the entire project, building all artifacts
  console Opens a hardhat console
  contracts Prints the list of contracts deployed
  coverage Generates a code coverage report for tests
  deploy Deploy contracts
  etherscan-verify submit contract source code to etherscan
  export export contract deployment of the specified network into one file
  flatten Flattens and prints contracts and their dependencies
  fund-link Funds a contract with LINK
  help Prints this message
  node Starts a JSON-RPC server on top of Hardhat EVM
  pinata Prints an account's balance
  read-random-number Reads the random number returned to a contract by Chainlink VRF
  request-random-number Requests a random number for a Chainlink VRF enabled smart contract
  run Runs a user-defined script after compiling the project
  sourcify submit contract source code to sourcify (https://sourcify.dev)
  test Runs mocha tests
  typechain Generate Typechain typings for compiled contracts
  verify Verifies contract on Etherscan
```

# Useful commands

```shell
  npx hardhat accounts
  npx hardhat compile
  npx hardhat clean
  npx hardhat test
  npx hardhat node
  npx hardhat help
  REPORT_GAS=true npx hardhat test
  npx hardhat coverage
  npx hardhat run scripts/deploy.ts
  TS_NODE_FILES=true npx ts-node scripts/deploy.ts
  npx eslint '**/*.{js,ts}'
  npx eslint '**/*.{js,ts}' --fix
  npx prettier '**/*.{json,sol,md}' --check
  npx prettier '**/*.{json,sol,md}' --write
  npx solhint 'contracts/**/*.sol'
  npx solhint 'contracts/**/*.sol' --fix
```

# Etherscan verification

```shell
npx hardhat verify --network [network-name] [deployed-contract-address] [params]
```

# Performance optimizations

For faster runs of your tests and scripts, consider skipping ts-node's type checking by setting the environment variable `TS_NODE_TRANSPILE_ONLY` to `1` in hardhat's environment. For more details see [the documentation](https://hardhat.org/guides/typescript.html#performance-optimizations).

# Sample URLS

https://testnets.opensea.io/collection/graag-v2
https://rinkeby.etherscan.io/address/0x02df0cdb3d94067ad744dae68cc0038189bdce4e
