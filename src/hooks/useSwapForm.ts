import { useState, useEffect, useCallback } from "react"
import { getRates, trade } from "api/exchange"
import { NULL_ADDRESS } from "utils/addresses"

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
  destId: string | undefined,
  destDecimals: number | undefined,
  safeAddress: string,
): UseExchangeRateReturnType => {
  const [srcQty, setSrcQty] = useState("")
  const [destQty, setDestQty] = useState("")
  const [rate, setRate] = useState("") // 1 src to dest
  const [slippageRate, setSlippageRate] = useState("")

  useEffect(() => {
    const fetchRates = async () => {
      const { expectedRate, slippageRate } = await getRates(
        srcId as string,
        destId as string,
        (10 ** (destDecimals || 18)).toString(),
      )

      setRate((parseFloat(expectedRate) / 10 ** (destDecimals || 18)).toString())
      setSlippageRate(expectedRate.toString())
    }

    if (srcId && destId) {
      fetchRates()
    }
  }, [srcId, destId, destDecimals])

  const handleSrcAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setSrcQty(value)
      setDestQty(value * rate)
    },
    [rate],
  )

  const handleDestAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setDestQty(value)
      setSrcQty(value / rate)
    },
    [rate],
  )

  const handleTrade = useCallback(() => {
    trade(
      srcId,
      (srcQty * 10 ** 18).toString(),
      destId,
      safeAddress,
      MAX_ALLOWANCE,
      slippageRate,
      NULL_ADDRESS,
    )
  }, [srcId, srcQty, safeAddress, destId, slippageRate])

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
