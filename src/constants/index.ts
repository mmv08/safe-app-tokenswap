const getApiUrl = (): string => {
  let url = "https://safe-transaction.staging.gnosisdev.com/api/v1/"

  if (process.env.NODE_ENV === "production") {
    if (process.env.NETWORK === "rinkeby") {
      url = "https://safe-transaction.rinkeby.gnosis.io/api/v1/"
    } else {
      url = "https://safe-transaction.mainnet.gnosis.io/api/v1/"
    }
  }

  return url
}

const API_URL = getApiUrl()

export { API_URL }
