const { getTronWebClient, pos } = require('../../utils')

const token = pos.child.erc721
const tokenId = '60399350241383852757821046101235634991156913804166740995010931519407953501076'
const to = ''
// withdraw
const execute = async () => {
  try {
    const tx = await getTronWebClient().burnERC721( { childToken: token, tokenId } )
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}
// withdrawTo
/*const execute = async () => {
  try {
    const tx = await getTronWebClient().burnERC721({ childToken: token, withdrawTo: true, tokenId, to })
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}*/
execute().then(() => process.exit(0))
