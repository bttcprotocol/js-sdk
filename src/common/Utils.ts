import { signTypedData } from 'eth-sig-util'
import EthUtil from 'ethereumjs-util'
import TronWeb from 'tronweb'
//import console from 'console'

export class Utils {
  getOrderHash(order) {
    const orderData = Buffer.concat([
      EthUtil.toBuffer(order.id),
      EthUtil.toBuffer(order.token),
      EthUtil.setLengthLeft(order.amount, 32),
    ])
    return EthUtil.keccak256(orderData)
  }

  getTypedData({ token, spender, tokenIdOrAmount, data, expiration, chainId }) {
    return {
      types: {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'contract', type: 'address' },
        ],
        TokenTransferOrder: [
          { name: 'spender', type: 'address' },
          { name: 'tokenIdOrAmount', type: 'uint256' },
          { name: 'data', type: 'bytes32' },
          { name: 'expiration', type: 'uint256' },
        ],
      },
      domain: {
        name: 'Matic Network',
        version: '1',
        chainId: chainId,
        contract: token,
      },
      primaryType: 'TokenTransferOrder',
      message: {
        spender,
        tokenIdOrAmount,
        data,
        expiration,
      },
    }
  }

  signEIP712TypedData(data, privateKey) {
    return signTypedData(EthUtil.toBuffer(privateKey), {
      data: data,
    })
  }

  createTronWeb(tronWebOptions) {
    if (tronWebOptions.tronWeb && typeof tronWebOptions.tronWeb === 'object') {
      return tronWebOptions.tronWeb
    }
    //const HttpProvider = TronWeb.providers.HttpProvider;
    //const tronWebOptions = Config.tronWebOptions;
    /*const fullNode = 'https://api.nileex.io'
    const solidityNode = 'https://api.nileex.io'
    const eventServer = 'https://event.nileex.io'*/
    const tronWeb = new TronWeb(
      tronWebOptions.fullNode,
      tronWebOptions.solidityNode,
      tronWebOptions.eventServer,
      tronWebOptions.privateKey
    )
    //address && tronWeb.setAddress(address);
    tronWeb.setAddress(tronWebOptions.address)
    return tronWeb
  }

  async getTronContract(tronWeb, abi, token) {
    const contract = await tronWeb.contract(abi, token)
    return contract
  }

  transferAddress(tronWeb, address, toHex) {
    if (!tronWeb || !address) {
      throw new Error(`address is not exist！`)
    }
    if (!toHex) {
      return tronWeb.address.fromHex(address)
    }
    return tronWeb.address.toHex(address)
  }
}
