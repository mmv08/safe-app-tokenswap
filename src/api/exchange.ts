import { kyberProxy } from "./contracts"

const getRates = async (
  srcTokenAddress: string,
  dstTokenAddress: string,
  srcQtyWei: string,
): Promise<string> => {
  return await kyberProxy.getExpectedRate(srcTokenAddress, dstTokenAddress, srcQtyWei).call()
}

export { getRates }
