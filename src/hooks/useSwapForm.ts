import { useState, useEffect, useCallback } from "react"
import superagent from "superagent"
import { KYBERSWAP_API_URL } from "utils/constants"

interface UseExchangeRateReturnType {
  ethQty: string
  destQty: string
  handleEthAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  handleDestAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

// How much eth do you need to buy a token
const fetchBuyRate = async (tokenId: string, tokenQty: string): Promise<string> => {
  const res = await superagent.get(`${KYBERSWAP_API_URL}/buy_rate?id=${tokenId}&qty=${tokenQty}`)

  return res.body.data[0].dst_qty[0]
}

// How much eth you will get by selling a token
const fetchSellRate = async (tokenId: string, tokenQty: string): Promise<string> => {
  const res = await superagent.get(`${KYBERSWAP_API_URL}/sell_rate?id=${tokenId}&qty=${tokenQty}`)

  return res.body.data[0].src_qty[0]
}

const useSwapForm = (destId: string | undefined): UseExchangeRateReturnType => {
  const [ethQty, setEthQty] = useState("")
  const [destQty, setDestQty] = useState("")

  const handleEthAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setEthQty(value)

      if (parseFloat(value) <= 0 || value === "") {
        setDestQty(value)
      } else {
        const sellRate = await fetchSellRate(destId, value)

        setDestQty(sellRate)
      }
    },
    [destId],
  )

  const handleDestAmountInputChange = useCallback(
    async (e: React.SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget

      setDestQty(value)

      if (parseFloat(value) <= 0 || value === "") {
        setEthQty(value)
      } else {
        const buyRate = await fetchBuyRate(destId, value)

        setEthQty(buyRate)
      }
    },
    [destId],
  )

  useEffect(() => {
    setEthQty("0")
    setDestQty("0")
  }, [destId])

  return { ethQty, destQty, handleEthAmountInputChange, handleDestAmountInputChange }
}

export { useSwapForm }
