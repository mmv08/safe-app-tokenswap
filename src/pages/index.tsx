import * as React from "react"
import styled from "styled-components"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Button from "@material-ui/core/Button"
import Layout from "components/Layout"
import Input from "components/Input"
import TokenSelect, { TokenProps } from "components/TokenSelect"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import { useExchangeCurrencies } from "hooks/useExchangeCurrencies"
import { useSwapForm } from "hooks/useSwapForm"
import { fromWeiToDisplayAmount } from "utils/formatters"
import { ETHER_ADDRESS } from "utils/constants"

const TokenSwapContainer = styled.div`
  display: flex;
  align-items: center;
`

const SwapImg = styled.img`
  margin: 0 15px;
`

const GNO_ADDRESS = "0x6810e776880c02933d47db1b9fc05908e5386b96" as const

const IndexPage: React.FC = () => {
  const [safeInfo, setSafeInfo] = React.useState<SafeInfo>()
  const [selectedToken, setSelectedToken] = React.useState<TokenProps | null>({
    id: ETHER_ADDRESS,
    label: "ETH",
  })
  const [selectedCurrency, setSelectedCurrency] = React.useState<TokenProps | null>({
    id: GNO_ADDRESS,
    label: "GNO",
  })
  const { destQty, ethQty, handleEthAmountInputChange, handleDestAmountInputChange } = useSwapForm(
    selectedCurrency?.id,
  )

  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)
  const { currencies } = useExchangeCurrencies()
  const tokenOptions = React.useMemo(
    () =>
      tokenBalances.map((balance) => ({
        id: balance.tokenAddress || ETHER_ADDRESS,
        label: balance.token?.symbol || "ETH",
        balance: fromWeiToDisplayAmount(balance.balance, balance.token?.decimals ?? 18),
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
    <Layout title="ETHSwap">
      <div>
        <h1>ETHSwap</h1>
        <p>{JSON.stringify(safeInfo, null, 2)}</p>
        <TokenSwapContainer>
          <TokenSelect
            disabled
            tokens={tokenOptions}
            activeItem={selectedToken}
            onItemClick={(_: React.ChangeEvent<unknown>, token: TokenProps | null): void =>
              setSelectedToken(token)
            }
          />
          <SwapImg src="/swap_horiz.svg" alt="Swap icon" />
          <TokenSelect
            tokens={currenciesOptions}
            activeItem={selectedCurrency}
            onItemClick={(_: React.ChangeEvent<unknown>, token: TokenProps | null): void =>
              setSelectedCurrency(token)
            }
          />
        </TokenSwapContainer>
        <TokenSwapContainer>
          <Input value={ethQty} onChange={handleEthAmountInputChange} />
          =
          <Input value={destQty} onChange={handleDestAmountInputChange} />
        </TokenSwapContainer>
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary">
            Swap
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
