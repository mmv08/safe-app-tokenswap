import React, { useState } from "react"
import Layout from "components/Layout"

const getAppInfoFromUrl = (url: string) => {
  console.log(url)
}

const someValue: any = undefined

getAppInfoFromUrl(someValue)

const IndexPage = () => {
  const [iframeEl, setIframeEl] = useState<HTMLIFrameElement>(null)

  console.log(selectedApp)

  return (
    <Layout title="Uniswap Gnosis Safe App">
      <h1>Exchange</h1>
    </Layout>
  )
}

export default IndexPage
