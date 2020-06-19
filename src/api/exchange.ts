import { appsSdk } from "gnosisAppsSdk"
import { kyberProxy } from "./contracts"
import { BigNumber } from "ethers"
import { KYBER_NETWORK_PROXY_ADDRESS } from "utils/constants"

type GetExpectedRateReturnType = {
  expectedRate: BigNumber
  slippageRate: BigNumber
}

const getRates = async (
  srcTokenAddress: string,
  dstTokenAddress: string,
  srcQtyWei: string,
): Promise<{ expectedRate: string; slippageRate: string }> => {
  const {
    expectedRate,
    slippageRate,
  }: GetExpectedRateReturnType = await kyberProxy.getExpectedRate(
    srcTokenAddress,
    dstTokenAddress,
    srcQtyWei.toString(),
  )

  return {
    expectedRate: expectedRate.toString(),
    slippageRate: slippageRate.toString(),
  }
}

const trade = (
  srcTokenAddress: string,
  srcQtyWei: string,
  dstTokenAddress: string,
  dstAddress: string,
  maxDstAmount: string,
  minConversionRate: string,
  walletId: string,
): void => {
  const txData = kyberProxy.interface.encodeFunctionData("trade", [
    srcTokenAddress,
    srcQtyWei,
    dstTokenAddress,
    dstAddress,
    maxDstAmount,
    minConversionRate,
    walletId,
  ])

  appsSdk.sendTransactions([
    {
      to: KYBER_NETWORK_PROXY_ADDRESS,
      value: srcQtyWei, // should be 0 if source token is not ether,
      data: txData,
    },
  ])
}

export { getRates, trade }
