import React from "react"
import styled, { css } from "styled-components"
import Layout from "components/Layout"

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
  return (
    <Layout title="Uniswap Gnosis Safe App">
      <SAppContainer center={process.env.NODE_ENV === "development"}>
        <h1>Exchange</h1>
      </SAppContainer>
    </Layout>
  )
}

export default IndexPage
