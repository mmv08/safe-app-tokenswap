import { useState, useEffect } from "react"
import superagent from "superagent"

const useTokenBalances = (safeAddress?: string) => {
  const [tokenBalances, setTokenBalances] = useState([])

  useEffect(() => {
    const fetchTokenBalances = async () => {
      const res = await superagent.get(`https://safe-transaction.gnosis.io/safes/${safeAddress}/balances`)

      console.log(res)
      setTokenBalances(res.body)
    }

    if (safeAddress) {
      fetchTokenBalances()
    }
  }, [safeAddress])

  return { tokenBalances }
}

export { useTokenBalances }
