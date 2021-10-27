const { getTronWebClient, from, pos } = require('../../utils')

const execute = async () => {
  try {
    const maticPOSClient = getTronWebClient()
    // const tx = await maticPOSClient.balanceOfERC20(from, pos.parent.erc20, {parent:true})
    const tx = await maticPOSClient.balanceOfERC20(
      '0x60e86bf02b466B9078077f03B62646B9dcBd8F86',
      '0x0000000000000000000000000000000000001010',
      { parent: false }
    )
    console.log(`====tx====`, tx) // eslint-disable-line
    const tx1 = await maticPOSClient.balanceOfERC20(
      'TTG8u8fUKqJwMtB59ppaWqgFVGDb5ojWPU',
      'TU2T8vpHZhCNY8fXGVaHyeZrKm8s6HEXWe',
      { parent: true }
    )
    console.log(`====tx====`, tx) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
