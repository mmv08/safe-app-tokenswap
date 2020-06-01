import * as React from "react"

const Placeholder = () => <span></span>

const NoSSR = ({ children, onSSR = <Placeholder /> }) => {
  const [canRender, setCanRender] = React.useState(false)

  React.useEffect(() => {
    setCanRender(true)
  }, [])

  return canRender ? children : onSSR
}

export default NoSSR
