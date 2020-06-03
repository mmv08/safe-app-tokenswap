import * as React from "react"
import styled from "styled-components"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Button from "@material-ui/core/Button"
import Layout from "components/Layout"
import TokenSelect from "components/TokenSelect2"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import { useExchangeCurrencies } from "hooks/useExchangeCurrencies"

const TokenSwapContainer = styled.div`
  display: flex;
  align-items: center;
`

const SwapImg = styled.img`
  margin: 0 15px;
`

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
        <TokenSwapContainer>
          <TokenSelect
            items={tokenOptions}
            activeItemId={selectedToken}
            onItemClick={(id) => setSelectedToken(id)}
          />
          <SwapImg src="/swap_horiz.svg" alt="Swap icon" />
          <TokenSelect
            items={currenciesOptions}
            activeItemId={selectedCurrency}
            onItemClick={(id) => setSelectedCurrency(id)}
          />
        </TokenSwapContainer>
        <div>
          <Button variant="contained" color="primary">
            Swap
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
