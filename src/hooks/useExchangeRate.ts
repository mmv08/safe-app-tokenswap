import { useState, useEffect } from "react"
import superagent from "superagent"
import { KYBERSWAP_API_URL, ETHER_ADDRESS } from "utils/constants"

const useExchangeRate = (
  src: string | undefined,
  srcAmount: string,
  dest: string | undefined,
  destAmount: string,
): { srcQty: string } => {
  const [srcQty, setSrcQty] = useState("")

  useEffect(() => {
    // this is restricted to ETH
    const fetchBuyRate = async () => {
      const res = await superagent.get(`${KYBERSWAP_API_URL}/buy_rate?id=${dest}&qty=${destAmount}`)

      setSrcQty(res.body.data[0].src_qty[0])
    }

    if (src === ETHER_ADDRESS && dest && parseFloat(destAmount) > 0) {
      fetchBuyRate()
    }
  }, [src, srcAmount, dest, destAmount])

  return { srcQty }
}

export { useExchangeRate }
