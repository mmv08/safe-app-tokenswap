import { useState, useEffect } from "react"
import superagent from "superagent"

const useTokenBalances = (safeAddress: string) => {
  const [tokenBalances, setTokenBalances] = useState([])

  useEffect(() => {
    const fetchTokenBalances = async () => {
      const balances = await superagent.get(`https://safe-transaction.gnosis.io/safes/${safeAddress}/balances`)

      console.log(balances)
      setTokenBalances(balances)
    }

    if (safeAddress) {
      fetchTokenBalances()
    }
  }, [safeAddress])

  return { tokenBalances }
}

export { useTokenBalances }
