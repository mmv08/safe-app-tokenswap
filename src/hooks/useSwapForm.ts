import { FixedNumber, BigNumber } from "ethers"
import { useState, useEffect, useCallback } from "react"
import { getRates, trade } from "api/exchange"
import { NULL_ADDRESS } from "utils/addresses"
import { formatFromWeiToEther, formatFromEtherToWei } from "utils/formatters"

interface UseExchangeRateReturnType {
  srcQty: string
  destQty: string
  handleSrcAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  handleDestAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  rate: string
  handleTrade: () => void
}

const MAX_ALLOWANCE =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935"

const useSwapForm = (
  srcId: string | undefined,
  srcDecimals: number | undefined,
  destId: string | undefined,
  destDecimals: number | undefined,
  safeAddress: string | undefined,
): UseExchangeRateReturnType => {
  const [srcQty, setSrcQty] = useState("")
  const [destQty, setDestQty] = useState("")
  const [rate, setRate] = useState<bigint | undefined>() // 1 src to dest
  const [slippageRate, setSlippageRate] = useState<bigint | undefined>()

  useEffect(() => {
    const fetchRates = async () => {
      const { expectedRate, slippageRate } = await getRates(
        srcId as string,
        destId as string,
        BigInt(10 ** (destDecimals || 18)),
      )

      setRate(expectedRate)
      setSlippageRate(slippageRate)
    }

    if (srcId && destId && safeAddress) {
      fetchRates()
    }
  }, [srcId, destId, destDecimals, safeAddress])

  const handleSrcAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setSrcQty(value)

      if (value && destDecimals && rate) {
        const srcQtyWei = formatFromEtherToWei(value, 0)
        const destQtyWei = BigInt(srcQtyWei) * rate

        setDestQty(formatFromWeiToEther(destQtyWei.toString(), destDecimals))
      }
    },
    [rate, destDecimals],
  )

  const handleDestAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setDestQty(value)
      if (value) {
        setSrcQty(FixedNumber.from(value).divUnsafe(FixedNumber.from(rate)).toString())
      }
    },
    [rate],
  )

  const handleTrade = useCallback(() => {
    if (!srcId || !srcDecimals || !destId || !safeAddress) {
      return
    }

    trade(
      srcId,
      BigNumber.from(srcQty)
        .mul(FixedNumber.from(BigNumber.from(10).pow(srcDecimals).toString()))
        .toString(),
      destId,
      safeAddress,
      MAX_ALLOWANCE,
      slippageRate,
      NULL_ADDRESS,
    )
  }, [srcId, srcQty, safeAddress, destId, slippageRate, srcDecimals])

  useEffect(() => {
    setSrcQty("0")
    setDestQty("0")
  }, [destId])

  return {
    srcQty,
    destQty,
    handleSrcAmountInputChange,
    handleDestAmountInputChange,
    rate,
    handleTrade,
  }
}

export { useSwapForm }
