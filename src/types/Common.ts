import BN from 'bn.js'
export type address = string

export declare interface SendOptions {
  from?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number
  encodeAbi?: boolean
  parent?: boolean
  to?: string
  onTransactionHash?: any
  onReceipt?: any
  onError?: any
  legacyProof?: boolean
}

export declare interface order {
  token: string
  amount: string
  expiry?: string | number
  orderId?: string
  spender?: string
}

export declare interface MaticClientInitializationOptions {
  network?: any
  version?: string
  parentProvider?: any
  maticProvider?: any
  parentDefaultOptions?: any
  maticDefaultOptions?: any
  registry?: string
  rootChain?: string
  depositManager?: string
  withdrawManager?: string
  posRootChainManager?: string
  posERC20Predicate?: string
  posERC721Predicate?: string
  posERC1155Predicate?: string
  posMintableERC1155Predicate?: string
  requestConcurrency?: number
}

export declare interface burnErc20Options {
  childToken: address
  amount: BN | string
  to?: string,
  withdrawTo?: boolean
}

export declare interface burnErc721Options {
  childToken: address
  tokenId: BN | string
  to?: string,
  withdrawTo?: boolean
}