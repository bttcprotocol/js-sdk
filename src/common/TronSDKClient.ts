import Network from '@maticnetwork/meta/network'
import BN from 'bn.js'
import TronContractsBase from '../common/TronContractsBase'
import TronWeb3Client from '../common/TronWeb3Client'
import { address, SendOptions } from '../types/Common'
//import console from 'console'

export default class TronSDKClient extends TronContractsBase {
  static initializeNetwork(network = 'testnet', version = 'mumbai') {
    const _network = new Network(network, version)
    if (!_network) throw new Error(`network ${network} - ${version} is not supported`)
    return _network
  }

  constructor(options: any = {}) {
    const web3Client = new TronWeb3Client(
      options.parentProvider || options.network.Main.RPC,
      options.maticProvider || options.network.Matic.RPC,
      options.parentDefaultOptions || {},
      options.maticDefaultOptions || {},
      options.tronWebOptions || {}
    )
    super(web3Client, options.network)
  }

  setWallet(_wallet) {
    this.web3Client.wallet = _wallet
  }

  async balanceOfERC20(userAddress: address, token: address, options: SendOptions = {}) {
    if (!token || !userAddress) {
      throw new Error('token address or user address is missing')
    }
    if (options.parent) {
      const tronWebOptions = this.getERC20TokenContract(token, options.parent)
      const contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false)
      const contract = await tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)
      const banlance = await contract.methods.balanceOf(userAddress).call()
      //Smart contract is missing address
      return banlance
    } else {
      return this.getERC20TokenContract(token, options.parent)
        .methods.balanceOf(userAddress)
        .call()
    }
  }

  async balanceOfERC721(userAddress: address, token: address, options: SendOptions = {}) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }
    if (options.parent) {
      const tronWebOptions = this.getERC20TokenContract(token, options.parent)
      const contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false)
      const contract = await tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)
      const banlance = await contract.methods.balanceOf(userAddress).call()
      //Smart contract is missing address
      return banlance
    } else {
      return this.getERC721TokenContract(token, options.parent)
        .methods.balanceOf(userAddress)
        .call()
    }
  }

  async tokenOfOwnerByIndexERC721(userAddress: address, token: address, index: number, options?: SendOptions) {
    if (options && (!token || !userAddress)) {
      throw new Error('token address or user address is missing')
    }
    if (options.parent) {
      const tronWebOptions = this.getERC721TokenContract(token, options.parent)
      const contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false)
      const contract = await tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)
      const tokenID = await contract.methods.tokenOfOwnerByIndex(userAddress, index).call()
      //Smart contract is missing address
      return tokenID
    } else {
      return this.getERC721TokenContract(token, options.parent)
        .methods.tokenOfOwnerByIndex(userAddress, index)
        .call()
    }
  }

  async transferERC20Tokens(token: address, to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !token || !to)) {
      throw new Error('options.from, to, token or amount is missing')
    }
    let txObject = null
    if (options.parent) {
      const tronWebOptions = this.getERC20TokenContract(token, options.parent)
      const contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false)
      const contract = await tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)
      txObject = await contract.methods.transfer(to, this.encode(amount)).call()
      //Smart contract is missing address
    } else {
      txObject = this.getERC20TokenContract(token, options.parent)
        .methods.transfer(to, this.encode(amount))
        .call()
    }
    //const txObject = this.getERC20TokenContract(token, options.parent).methods.transfer(to, this.encode(amount))
    const onRootChain = options.parent ? true : false
    const web3Options = await this.web3Client.fillOptions(txObject, onRootChain, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async transferERC721Tokens(token: address, to: address, tokenId: string, options?: SendOptions) {
    if (options && (!options.from || !tokenId || !token || !to)) {
      throw new Error('options.from, to, token or tokenId is missing')
    }
    let txObject = null
    if (options.parent) {
      const tronWebOptions = this.getERC721TokenContract(token, options.parent)
      const contractAddress = this.utils.transferAddress(tronWebOptions.web3, token, false)
      const contract = await tronWebOptions.web3.contract(tronWebOptions.abi, contractAddress)
      txObject = await contract.methods.transferFrom(options.from, to, tokenId).call()
      //Smart contract is missing address
    } else {
      txObject = this.getERC721TokenContract(token, options.parent)
        .methods.transferFrom(options.from, to, tokenId)
        .call()
    }
    //const txObject = this.getERC721TokenContract(token, options.parent).methods.transferFrom(options.from, to, tokenId)
    const onRootChain = options.parent ? true : false
    const web3Options = await this.web3Client.fillOptions(txObject, onRootChain, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }

  async transferMaticEth(to: address, amount: BN | string, options?: SendOptions) {
    if (options && (!options.from || !amount || !to)) {
      throw new Error('options.from, to or amount is missing')
    }
    const token = TronContractsBase.MATIC_CHILD_TOKEN
    const txObject = this.getChildMaticContract().methods.transfer(to, this.encode(amount))
    options.value = this.encode(amount)
    const web3Options = await this.web3Client.fillOptions(txObject, false /* onRootChain */, options)
    if (web3Options.encodeAbi) {
      return Object.assign(web3Options, { data: txObject.encodeABI(), to: token })
    }
    return this.web3Client.send(txObject, web3Options, options)
  }
}
