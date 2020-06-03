import * as React from "react"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Layout from "components/Layout"
import TokenSelect from "components/TokenSelect"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import { useExchangeCurrencies } from "hooks/useExchangeCurrencies"
import NoSSR from "components/NoSSR"
import { GNOSIS_TOKEN_LOGOS_URL } from "utils/constants"

const IndexPage: React.FC = () => {
  const [safeInfo, setSafeInfo] = React.useState<SafeInfo>()
  const [selectedToken, setSelectedToken] = React.useState("")
  const [selectedCurrency, setSelectedCurrency] = React.useState("")

  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)
  const { currencies } = useExchangeCurrencies()
  const tokenOptions = React.useMemo(
    () =>
      tokenBalances.map((token) => ({
        id: token.tokenAddress || "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        label: token.token?.symbol || "ETH",
      })),
    [tokenBalances],
  )
  const currenciesOptions = React.useMemo(
    () =>
      currencies.map((currency) => ({
        id: currency.address,
        label: currency.symbol,
      })),
    [currencies],
  )

  console.log({ tokenBalances })

  React.useEffect(() => {
    appsSdk.addListeners({ onSafeInfo: setSafeInfo })

    return () => {
      appsSdk.removeListeners()
    }
  }, [])

  return (
    <Layout title="Tokenswap">
      <div>
        <h1>Exchange</h1>
        <p>{JSON.stringify(safeInfo, null, 2)}</p>
        <div>
          <TokenSelect
            items={tokenOptions}
            activeItemId={selectedToken}
            onItemClick={(id) => setSelectedToken(id)}
          />
        </div>
        <div>
          <TokenSelect
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
