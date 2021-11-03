import BN from 'bn.js'

import TronWeb3Client from './TronWeb3Client'

import { address } from '../types/Common'
import { Utils } from '../common/Utils'
const ChildERC20 = require('./ChildERC20')
const ChildERC721 = require('./ChildERC721')
//import console from 'console'

export default class TronContractsBase {
  static MATIC_CHILD_TOKEN: address = '0x0000000000000000000000000000000000001010'

  web3Client: TronWeb3Client
  network: any
  utils: Utils

  constructor(web3Client: TronWeb3Client, network: any) {
    this.web3Client = web3Client
    this.network = network
    this.utils = new Utils()
  }

  public encode(number: BN | string | number) {
    if (typeof number === 'number') {
      number = new BN(number)
    } else if (typeof number === 'string') {
      if (number.slice(0, 2) === '0x') return number
      number = new BN(number)
    }
    if (BN.isBN(number)) {
      return '0x' + number.toString(16)
    }
  }

  public getERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return parent
      ? { abi: this.network.abi('ChildERC20'), web3 }
      : new web3.eth.Contract(this.network.abi('ChildERC20'), token)
  }

  public getERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    //return new web3.eth.Contract(this.network.abi('ChildERC721'), token)
    return parent
      ? { abi: this.network.abi('ChildERC721'), web3 }
      : new web3.eth.Contract(this.network.abi('ChildERC721'), token)
  }

  public getChildMaticContract() {
    return new this.web3Client.web3.eth.Contract(this.network.abi('MRC20'), TronContractsBase.MATIC_CHILD_TOKEN)
  }

  public getPOSERC20TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    return parent
      ? { abi: JSON.parse(ChildERC20)/*this.network.abi('ChildERC20', 'pos')*/, web3 }
      : new web3.eth.Contract(JSON.parse(ChildERC20)/*this.network.abi('ChildERC20', 'pos')*/, token)
  }

  public getPOSERC721TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    //return new web3.eth.Contract(this.network.abi('ChildERC721', 'pos'), token)
    return parent
      ? { abi: JSON.parse(ChildERC721)/*this.network.abi('ChildERC721', 'pos')*/, web3 }
      : new web3.eth.Contract(JSON.parse(ChildERC721)/*this.network.abi('ChildERC721', 'pos')*/, token)
  }

  public getPOSERC1155TokenContract(token: address, parent: boolean = false) {
    const web3 = parent ? this.web3Client.parentWeb3 : this.web3Client.web3
    //return new web3.eth.Contract(this.network.abi('ChildERC1155', 'pos'), token)
    return parent
      ? { abi: this.network.abi('ChildERC1155', 'pos'), web3 }
      : new web3.eth.Contract(this.network.abi('ChildERC1155', 'pos'), token)
  }
}
