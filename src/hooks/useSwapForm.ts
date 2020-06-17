import { useState, useEffect, useCallback } from "react"

interface UseExchangeRateReturnType {
  ethQty: string
  destQty: string
  handleEthAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
  handleDestAmountInputChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
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
