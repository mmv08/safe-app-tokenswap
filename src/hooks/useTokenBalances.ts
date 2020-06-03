import { useState, useEffect } from "react"
import superagent from "superagent"
import { GNOSIS_API_URL } from "utils/constants"

interface Token {
  name: string
  decimals: number
  logoUri: string
  symbol: string
}

interface TokenBalance {
  balance: string
  tokenAddress: string | null
  token: Token | null
}

const useTokenBalances = (safeAddress?: string) => {
  const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([])

  useEffect(() => {
    const fetchTokenBalances = async () => {
      const res = await superagent.get(`${GNOSIS_API_URL}/safes/${safeAddress}/balances`)

      setTokenBalances(res.body)
    }

    if (safeAddress) {
      fetchTokenBalances()
    }
  }, [safeAddress])

  return { tokenBalances }
}

export { useTokenBalances }
