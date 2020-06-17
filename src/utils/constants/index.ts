const getGnosisApiUrl = (): string => {
  let url = "https://safe-transaction.staging.gnosisdev.com/api/v1"

  if (process.env.NODE_ENV === "production") {
    if (process.env.NETWORK === "rinkeby") {
      url = "https://safe-transaction.rinkeby.gnosis.io/api/v1"
    } else {
      url = "https://safe-transaction.mainnet.gnosis.io/api/v1"
    }
  }

  return url
}

const GNOSIS_API_URL = getGnosisApiUrl()
const GNOSIS_TOKEN_LOGOS_URL = "https://gnosis-safe-token-logos.s3.amazonaws.com"

export { GNOSIS_API_URL, GNOSIS_TOKEN_LOGOS_URL }
export * from "./tokens"
export * from "./abi"
export * from "./contractAddresses"
