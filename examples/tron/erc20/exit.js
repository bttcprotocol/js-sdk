const { getTronWebClient, from } = require('../../utils')
//61984,0xcab27d9049589de708cf5d4644e24b8d9836146f5617d38d412565ad530250cb

const burnHash = '0x30d9014f6a4ebb7b1c96b1be5ed2a7e51492110e34fdbc88edd50bbd94527082'

const execute = async () => {
  try {
    const tx = await getTronWebClient().exitERC20(burnHash, {
      from: '0x37211f7829b2236e4c75d5532c1bf3f043222688',
      gasPrice: 900000000000,
      gas: 400000,
      legacyProof: true,
      extension: 3600
    })
    console.log(`====tx====`, tx)
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
