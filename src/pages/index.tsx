import * as React from "react"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import Layout from "components/Layout"
import Select from "components/layout/Select"
import { appsSdk } from "gnosisAppsSdk"
import { useTokenBalances } from "hooks/useTokenBalances"
import NoSSR from "components/NoSSR"

const IndexPage = () => {
  const [safeInfo, setSafeInfo] = React.useState<SafeInfo>()
  const [selectedToken, setSelectedToken] = React.useState("")

  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)
  const tokenOptions = React.useMemo(
    () =>
      tokenBalances.map((token) => ({
        id: token.tokenAddress || "ether",
        label: token.token?.symbol || "ETH",
        iconUrl: token.token?.logoUri,
      })),
    [tokenBalances],
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
        <Select items={tokenOptions} activeItemId={selectedToken} onItemClick={(id) => setSelectedToken(id)} />
      </div>
    </Layout>
  )
}

export default IndexPage
