const { getTronWebClient, pos, from } = require('../../utils')

const amount = '100000000000000' // amount in wei
const token = '0x37349AEB75A32F8C4C090DAFF376CF975F5D2EBA'

const execute = async () => {
  try {
    const tx = await getTronWebClient().burnERC20(token, amount, {
      from: from,
      gasPrice: 1000000000,
      gas: 400000,
      parent: true,
    })
    console.log(`====tx====`, tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
