import { useState, useEffect } from "react"
import superagent from "superagent"
import { KYBERSWAP_API_URL, ETHER_ADDRESS } from "utils/constants"

const useExchangeRate = (
  src: string | undefined,
  srcInputAmount: string,
  dest: string | undefined,
  destInputAmount: string,
): { srcQty: string; destQty: string } => {
  const [srcQty, setSrcQty] = useState("")
  const [destQty, setDestQty] = useState("")

  useEffect(() => {
    // this endpoint is restricted to ETH
    const fetchBuyRate = async () => {
      const res = await superagent.get(
        `${KYBERSWAP_API_URL}/buy_rate?id=${dest}&qty=${destInputAmount}`,
      )

      setSrcQty(res.body.data[0].src_qty[0])
    }

    if (src === ETHER_ADDRESS && dest && parseFloat(destInputAmount) > 0) {
      fetchBuyRate()
    }
  }, [src, srcInputAmount, dest, destInputAmount])

  return { srcQty, destQty: destInputAmount }
}

export { useExchangeRate }
