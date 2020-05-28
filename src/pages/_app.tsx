import * as React from "react"
import { GlobalStyle } from "styles/global"

interface GlobalAppProps {
  Component: React.ElementType
  pageProps: Object
}

const MyApp: React.FC<GlobalAppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
