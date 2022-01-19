// Testnet V3 config
module.exports = {
  parent: {
    rpc: 'https://rpc.goerli.mudit.blog/',
    //rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  },
  child: {
    rpc: '', // This is the bttc testnet RPC
  },
  pos: {
    parent: {
      chainManagerAddress: '0x6db3d47608e276e4b55f8cb1e938e2b3c5b9a347', // Address of RootChainManagerProxy for POS Portal
      rootChain: '0x64a15905568f15079c5e2f068c72b7ef32598f62', // Address of RootChainProxy for POS Portal

      erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af',
      erc721: '0x5a08d01e07714146747950CE07BB0f741445D1b8',
      erc1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
      erc20Predicate: '0xdD6596F2029e6233DEFfaCa316e6A95217d4Dc34',
      erc721Predicate: '0x74D83801586E9D3C4dc45FfCD30B54eA9C88cf9b',
      erc1155Predicate: '0xB19a86ba1b50f0A395BfdC3557608789ee184dC8',
      etherPredicate: '0xe2B01f3978c03D6DdA5aE36b2f3Ac0d66C54a6D5',
    },
    child: {
      erc721: '0xEC8CB8bBb069470bC358ffB0e3710c64830da383',
      erc20: '0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3',
      weth: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
      erc1155: '0xA07e45A987F19E25176c877d98388878622623FA',
      btt: '0x0000000000000000000000000000000000001010',
    },
  },
  SYNCER_URL: '', // Backend service which syncs the Bttc sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: '', // Backend service which syncs the Bttc Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  user1: {
    privateKey: '',
    address: '',
  },
  user2: {
    address: '<paste address here>', // Your address
  },
  tronWebOptions: {
    privateKey: '',
    address: '', // A sample address prefix with `T`
    fullNode: 'https://api.nileex.io',
    solidityNode: 'https://api.nileex.io',
    eventServer: 'https://event.nileex.io',
    rootChain: 'TM9iNimxhFXbB5ReTne6Cj9U7zhXMDtzAK', // A sample address prefix with `T`
    posRootChainManager: 'TDEMoMqt5furPNCwFDRjtU4jRt7u7XNzib', // A sample address prefix with `T`
  },
}


