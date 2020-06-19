import BigNumber from "bignumber.js"
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
  const [srcQty, setSrcQty] = useState("") // in ether
  const [destQty, setDestQty] = useState("") // in ether
  const [rate, setRate] = useState("") // 1 src to dest in wei
  const [slippageRate, setSlippageRate] = useState("")

  useEffect(() => {
    const fetchRates = async () => {
      const decimalsAsBn = new BigNumber(srcDecimals || 18)
      const tenAsBn = new BigNumber(10)
      const { expectedRate, slippageRate } = await getRates(
        srcId as string,
        destId as string,
        tenAsBn.pow(decimalsAsBn).toString(),
      )

      setRate(expectedRate)
      setSlippageRate(slippageRate)
    }

    if (srcId && destId && safeAddress) {
      fetchRates()
    }
  }, [srcId, destId, srcDecimals, safeAddress])

  const handleSrcAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setSrcQty(value)

      if (!value) {
        setDestQty("")
      }

      if (value && destDecimals && rate) {
        const rateAsBn = new BigNumber(rate)
        const destQtyWei = new BigNumber(value).times(rateAsBn)

        setDestQty(formatFromWeiToEther(destQtyWei.toString(), destDecimals).toString())
      }
    },
    [rate, destDecimals],
  )

  const handleDestAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setDestQty(value)

      if (!value) {
        setSrcQty("")
      }

      if (value && rate) {
        const rateAsEther = formatFromWeiToEther(rate, srcDecimals)
        const destQtyAsBn = new BigNumber(value)

        const srcQty = destQtyAsBn.div(rateAsEther)
        setSrcQty(srcQty.toString())
      }
    },
    [rate, srcDecimals],
  )

  const handleTrade = useCallback(() => {
    if (!srcId || !srcDecimals || !destId || !safeAddress) {
      return
    }

    trade(
      srcId,
      formatFromEtherToWei(srcQty, srcDecimals).toString(),
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
