import { useState, useEffect } from "react"
import superagent from "superagent"
import { KYBERSWAP_API_URL } from "utils/constants"

interface Currency {
  name: string
  decimals: number
  address: string
  symbol: string
  id: string
  reserves_src?: string[]
  reserves_dest?: string[]
}

const useExchangeCurrencies = (): { currencies: Currency[] } => {
  const [currencies, setCurrencies] = useState<Currency[]>([])

  useEffect(() => {
    const fetchTokenBalances = async () => {
      const res = await superagent.get(`${KYBERSWAP_API_URL}/currencies`)

      setCurrencies(res.body.data)
    }

    fetchTokenBalances()
  }, [])

  return { currencies }
}

export { useExchangeCurrencies }
