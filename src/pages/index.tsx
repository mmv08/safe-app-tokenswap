import * as React from "react"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Layout from "components/Layout"
import TokenSelect from "components/TokenSelect"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import { useExchangeCurrencies } from "hooks/useExchangeCurrencies"
import NoSSR from "components/NoSSR"
import { GNOSIS_TOKEN_LOGOS_URL } from "constants"
import { toChecksummedAddress } from "utils/addresses"

const IndexPage = () => {
  const [safeInfo, setSafeInfo] = React.useState<SafeInfo>()
  const [selectedToken, setSelectedToken] = React.useState("")
  const [selectedCurrency, setSelectedCurrency] = React.useState("")

  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)
  const { currencies } = useExchangeCurrencies()
  const tokenOptions = React.useMemo(
    () =>
      tokenBalances.map((token) => ({
        id: token.tokenAddress || "ether",
        label: token.token?.symbol || "ETH",
        iconUrl: token.token?.logoUri,
      })),
    [tokenBalances],
  )
  const currenciesOptions = React.useMemo(
    () =>
      currencies.map((currency) => ({
        id: currency.address,
        label: currency.symbol,
        iconUrl: `${GNOSIS_TOKEN_LOGOS_URL}/${toChecksummedAddress(currency.address)}.png`,
      })),
    [currencies],
  )

  console.log({ tokenBalances })

  React.useEffect(() => {
    appsSdk.addListeners({ onSafeInfo: setSafeInfo })

    return () => {
      appsSdk.removeListeners()
    }
  })

  return (
    <Layout title="Tokenswap">
      <div>
        <h1>Exchange</h1>
        <p>{JSON.stringify(safeInfo, null, 2)}</p>
        <div>
          <Select items={tokenOptions} activeItemId={selectedToken} onItemClick={(id) => setSelectedToken(id)} />
        </div>
        <div>
          <Select
            items={currenciesOptions}
            activeItemId={selectedCurrency}
            onItemClick={(id) => setSelectedCurrency(id)}
          />
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
