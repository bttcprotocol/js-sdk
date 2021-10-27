const { pos, from, getTronWebClient } = require('../../utils')

const amount = '1' // amount in wei
const erc20TokenOnParent = '0x37349AEB75A32F8C4C090DAFF376CF975F5D2EBA' //pos.parent.erc20
async function execute() {
  const maticPOSClient = getTronWebClient()
  const result = await maticPOSClient.approveERC20ForDeposit(erc20TokenOnParent, amount, { from })
  console.log(`====result====`, result)
}

execute().then(_ => {
  process.exit(0)
})
