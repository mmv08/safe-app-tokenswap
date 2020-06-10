import * as React from "react"
import styled, { css } from "styled-components"
import { GNOSIS_TOKEN_LOGOS_URL, ETHER_ADDRESS } from "utils/constants"
import { toChecksummedAddress } from "utils/addresses"
import EtherIcon from "assets/icon_ether.svg"
import TokenPlaceholder from "assets/token_placeholder.svg"

interface Props {
  size?: number
  tokenName: string
  address: string
}

const Image = styled.img<{ size: number; hidden: boolean }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};

  ${({ hidden }) =>
    hidden &&
    css`
      display: none;
    `};
`

const TokenIcon: React.FC<Props> = ({ size = 20, tokenName, address }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false)

  let tokenIconSrc = `${GNOSIS_TOKEN_LOGOS_URL}/${toChecksummedAddress(address)}.png`
  if (address === ETHER_ADDRESS) {
    tokenIconSrc = EtherIcon
  }

  return (
    <>
      <Image
        src={tokenIconSrc}
        size={size}
        alt={tokenName}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageLoaded(false)}
        hidden={!imageLoaded}
      />
      <Image src={TokenPlaceholder} size={size} alt={tokenName} hidden={imageLoaded} />
    </>
  )
}

export default TokenIcon
