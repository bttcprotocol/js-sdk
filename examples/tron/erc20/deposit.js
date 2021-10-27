const { getTronWebClient, from, pos } = require('../../utils')

const amount = '1000000000000000' // amount in wei
//const token = ''
const token = pos.child.erc20

const execute = async () => {
  try {
    const tx = await getTronWebClient().depositERC20ForUser(token, from, amount)
    console.log(`====tx====`, tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))
