import * as React from "react"
import styled, { css } from "styled-components"
import Layout from "components/Layout"
import { appsSdk } from "gnosisAppsSdk"
import { SafeInfo } from "@gnosis.pm/safe-apps-sdk"
import { useTokenBalances } from "hooks/useTokenBalances"

const centerCSS = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const SAppContainer = styled.div<{ center: boolean }>`
  ${(p) => p.center && centerCSS}
`

const IndexPage = () => {
  const [safeInfo, setSafeInfo] = React.useState<SafeInfo>()

  const { tokenBalances } = useTokenBalances(safeInfo?.safeAddress)

  console.log({ tokenBalances })

  React.useEffect(() => {
    appsSdk.addListeners({ onSafeInfo: setSafeInfo })

    return () => {
      appsSdk.removeListeners()
    }
  })

  return (
    <Layout title="Uniswap Gnosis Safe App">
      <SAppContainer center={process.env.NODE_ENV === "development"}>
        <h1>Exchange</h1>
        <p>{JSON.stringify(safeInfo, null, 2)}</p>
      </SAppContainer>
    </Layout>
  )
}

export default IndexPage
