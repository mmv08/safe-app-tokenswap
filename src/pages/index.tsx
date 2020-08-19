import * as React from "react"
import styled from "styled-components"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Button from "@material-ui/core/Button"
import Layout from "components/Layout"
import Input from "components/Input"
import TokenSelect, { TokenProps } from "components/TokenSelect"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import { useExchangeTokens } from "hooks/useExchangeTokens"
import { useSwapForm } from "hooks/useSwapForm"
import { fromWeiToDisplayAmount, formatFromWeiToEther } from "utils/formatters"
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
  const [srcToken, setSrcToken] = React.useState<TokenProps | null>({
    id: ETHER_ADDRESS,
    label: "ETH",
    decimals: 18,
  })
  const [destToken, setDestToken] = React.useState<TokenProps | null>({
    id: GNO_ADDRESS,
    label: "GNO",
    decimals: 18,
  })
  const {
    destQty,
    srcQty,
    handleSrcAmountInputChange,
    handleDestAmountInputChange,
    rate,
    handleTrade,
  } = useSwapForm(
    srcToken?.id,
    srcToken?.decimals,
    destToken?.id,
    destToken?.decimals,
    safeInfo?.safeAddress,
  )
  console.log({ safeInfo })
  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)
  const { tokens: exchangeTokens } = useExchangeTokens()
  const tokenOptions = React.useMemo(
    () =>
      tokenBalances.map((balance) => ({
        id: balance.tokenAddress || ETHER_ADDRESS,
        label: balance.token?.symbol || "ETH",
        balance: fromWeiToDisplayAmount(balance.balance, balance.token?.decimals ?? 18),
        decimals: balance.token?.decimals ?? 18,
      })),
    [tokenBalances],
  )
  const exchangeTokensOptions = React.useMemo(
    () =>
      exchangeTokens.map((exchangeToken) => ({
        id: exchangeToken.address,
        label: exchangeToken.symbol,
        decimals: exchangeToken.decimals,
      })),
    [exchangeTokens],
  )

  const sendTestTx = () => {
    const message = appsSdk.sendTransactions([
      {
        to: "0x6810e776880c02933d47db1b9fc05908e5386b96",
        data: "0x",
        value: "100000000000000000",
      },
    ])
    console.log({ message })
  }

  React.useEffect(() => {
    appsSdk.addListeners({
      onSafeInfo: setSafeInfo,
      onTransactionConfirmation: (event) => console.log(event),
    })

    return () => {
      appsSdk.removeListeners()
    }
  }, [])

  const fortmattedRate = rate
    ? formatFromWeiToEther(rate.toString(), destToken?.decimals).toString()
    : ""

  return (
    <Layout title="ETHSwap">
      <div>
        <h1>ETHSwap</h1>
        <p>{JSON.stringify(safeInfo, null, 2)}</p>
        <TokenSwapContainer>
          <TokenSelect
            disabled
            tokens={tokenOptions}
            activeItem={srcToken}
            onItemClick={(_: React.ChangeEvent<unknown>, token: TokenProps | null): void =>
              setSrcToken(token)
            }
          />
          <SwapImg src="/swap_horiz.svg" alt="Swap icon" />
          <TokenSelect
            tokens={exchangeTokensOptions}
            activeItem={destToken}
            onItemClick={(_: React.ChangeEvent<unknown>, token: TokenProps | null): void =>
              setDestToken(token)
            }
          />
        </TokenSwapContainer>
        <TokenSwapContainer>
          <Input value={srcQty} onChange={handleSrcAmountInputChange} />
          =
          <Input value={destQty} onChange={handleDestAmountInputChange} />
        </TokenSwapContainer>
        <div>
          {srcToken && destToken && (
            <p>
              1 {srcToken.label} = {fortmattedRate} {destToken.label}
            </p>
          )}
        </div>
        <div style={{ marginTop: 20 }}>
          <Button variant="contained" color="primary" onClick={handleTrade}>
            Swap
          </Button>
          <Button variant="text" color="primary" onClick={sendTestTx}>
            Test transaction
          </Button>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage
