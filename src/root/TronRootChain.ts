//import { Contract } from 'web3-eth-contract'

import TronContractsBase from '../common/TronContractsBase'
import { MaticClientInitializationOptions } from '../types/Common'
import TronWeb3Client from '../common/TronWeb3Client'
import BN from 'bn.js'
//import console from 'console'
//import { Utils } from '../common/Utils'
//import Tronweb from 'tronweb'

const logger = {
  info: require('debug')('maticjs:Web3Client'),
  debug: require('debug')('maticjs:debug:Web3Client'),
}

export default class TronRootChain extends TronContractsBase {
  static BIG_ONE: BN = new BN(1)
  static BIG_TWO: BN = new BN(2)
  static CHECKPOINT_ID_INTERVAL: BN = new BN(10000)

  public rootChain: any
  //public utils: Utils

  constructor(options: MaticClientInitializationOptions, web3Client: TronWeb3Client) {
    super(web3Client, options.network)
    //this.rootChain = new this.web3Client.parentWeb3.eth.Contract(options.network.abi('RootChain'), options.rootChain)
    // this.utils = new Utils()
    this.rootChain = {
      tronWeb: this.web3Client.parentWeb3,
      abi: options.network.abi('RootChain'),
      token: options.rootChain,
    }
  }
  async getTronRootChainContract() {
    const contract = await this.utils.getTronContract(this.rootChain.tronWeb, this.rootChain.abi, this.rootChain.token)
    return contract
  }
  async getLastChildBlock() {
    // abi里要有getLastChildBlock方法
    const contract = await this.getTronRootChainContract()
    const result = await contract.methods.getLastChildBlock().call()
    return result
    //return this.web3Client.call(this.rootChain.methods.getLastChildBlock())
  }

  async getCheckpointInclusion(burnTxHash) {
    // check checkpoint
    const lastChildBlock = await this.getLastChildBlock()
    const burnTx = await this.web3Client.getMaticWeb3().eth.getTransaction(burnTxHash)

    if (new BN(lastChildBlock).lt(new BN(burnTx.blockNumber))) {
      return 'Burn transaction has not been checkpointed as yet'
    }

    const headerBlockNumber = await this.findHeaderBlockNumber(burnTx.blockNumber)
    // headerBlocks 方法也要有
    const contract = await this.getTronRootChainContract()
    const headerBlock = await contract.methods.headerBlocks(this.encode(headerBlockNumber)).call()
    //const headerBlock = await this.web3Client.call(this.rootChain.methods.headerBlocks(this.encode(headerBlockNumber)))
    return headerBlock
  }

  async findHeaderBlockNumber(childBlockNumber: BN | string | number): Promise<BN> {
    childBlockNumber = new BN(childBlockNumber)
    // first checkpoint id = start * 10000
    let start = TronRootChain.BIG_ONE
    // last checkpoint id = end * 10000
    /*let end = new BN(await this.web3Client.call(this.rootChain.methods.currentHeaderBlock())).div(
      TronRootChain.CHECKPOINT_ID_INTERVAL
    )*/
    // currentHeaderBlock 方法要有
    const contract = await this.getTronRootChainContract()
    const currentHeaderBlock = await contract.methods.currentHeaderBlock().call()
    let end = new BN(currentHeaderBlock.toNumber()).div(TronRootChain.CHECKPOINT_ID_INTERVAL)
    // binary search on all the checkpoints to find the checkpoint that contains the childBlockNumber
    let ans
    while (start.lte(end)) {
      if (start.eq(end)) {
        ans = start
        break
      }
      let mid = start.add(end).div(TronRootChain.BIG_TWO)
      logger.debug({ start: start.toString(), mid: mid.toString(), end: end.toString() }) // eslint-disable-line
      /*const headerBlock = await this.web3Client.call(
        this.rootChain.methods.headerBlocks(mid.mul(TronRootChain.CHECKPOINT_ID_INTERVAL).toString())
      )*/
      const headerBlock = await contract.methods
        .headerBlocks(mid.mul(TronRootChain.CHECKPOINT_ID_INTERVAL).toString())
        .call()
      const headerStart = new BN(headerBlock.start.toNumber())
      const headerEnd = new BN(headerBlock.end.toNumber())
      if (headerStart.lte(childBlockNumber) && childBlockNumber.lte(headerEnd)) {
        // if childBlockNumber is between the upper and lower bounds of the headerBlock, we found our answer
        ans = mid
        break
      } else if (headerStart.gt(childBlockNumber)) {
        // childBlockNumber was checkpointed before this header
        end = mid.sub(TronRootChain.BIG_ONE)
      } else if (headerEnd.lt(childBlockNumber)) {
        // childBlockNumber was checkpointed after this header
        start = mid.add(TronRootChain.BIG_ONE)
      }
    }
    return ans.mul(TronRootChain.CHECKPOINT_ID_INTERVAL)
  }
}
