import { useState, useEffect } from "react"
import superagent from "superagent"
import { KYBERSWAP_API_URL } from "utils/constants"

interface ExchangeToken {
  name: string
  decimals: number
  address: string
  symbol: string
  id: string
  reserves_src?: string[]
  reserves_dest?: string[]
}

const useExchangeTokens = (): { tokens: ExchangeToken[] } => {
  const [tokens, setTokens] = useState<ExchangeToken[]>([])

  useEffect(() => {
    const fetchExchangeTokens = async () => {
      const res = await superagent.get(`${KYBERSWAP_API_URL}/currencies`)

      setTokens(res.body.data)
    }

    fetchExchangeTokens()
  }, [])

  return { tokens }
}

export { useExchangeTokens }
