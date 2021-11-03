const { getBttcPOSClient, pos, from } = require('../../utils')

const amount = '1' // amount in wei
const token = '0x0E0b717876086C6502cFef6C06A1350E79374dA5'
const to = '0x37349AEB75A32F8C4C090DAFF376CF975F5D2EBA'
//withdraw
//const execute = async () => {
//  try {
//    const tx = await getBttcPOSClient().burnERC20({ childToken: token, amount }, {
//      from: from,
//      gasPrice: 900000000000,
//      gas: 300000,
//    })
//    console.log(tx) // eslint-disable-line
//  } catch (e) {
//    console.error(e) // eslint-disable-line
//  }
//}
//withdrawTo
const execute = async () => {
  try {
    const tx = await getBttcPOSClient().burnERC20({ childToken: token, withdrawTo: true, amount, to }, {
      from: from,
      gasPrice: 900000000000,
      gas: 300000,
    })
    console.log(tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))