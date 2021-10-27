const { getTronWebClient, from } = require('../../utils')
//61984,0xcab27d9049589de708cf5d4644e24b8d9836146f5617d38d412565ad530250cb

const burnHash = '0xcab27d9049589de708cf5d4644e24b8d9836146f5617d38d412565ad530250cb'

const execute = async () => {
  try {
    const tx = await getTronWebClient().exitERC20(burnHash, {
      from: from,
      gasPrice: 900000000000,
      gas: 400000,
      legacyProof: true,
    })
    console.log(`====tx====`, tx)
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
execute().then(() => process.exit(0))
