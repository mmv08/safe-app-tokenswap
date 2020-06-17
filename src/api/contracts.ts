import ethers from "ethers"
import { provider } from "./provider"
import { KYBER_NETWORK_PROXY_ABI, KYBER_NETWORK_PROXY_ADDRESS } from "utils/constants"

const kyberProxy = new ethers.Contract(
  KYBER_NETWORK_PROXY_ADDRESS,
  KYBER_NETWORK_PROXY_ABI,
  provider,
)

export { kyberProxy }
