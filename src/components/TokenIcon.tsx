import * as React from "react"
import styled from "styled-components"
import { GNOSIS_TOKEN_LOGOS_URL, ETHER_ADDRESS } from "utils/constants"
import { toChecksummedAddress } from "utils/addresses"
import { setImageToPlaceholder } from "utils/tokens/images"
import EtherIcon from "assets/icon_ether.svg"

interface Props {
  size?: number
  tokenName: string
  address: string
}

const Image = styled.img<{ size: number }>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
`

const TokenIcon: React.FC<Props> = ({ size = 20, tokenName, address }) => {
  let tokenIconSrc = `${GNOSIS_TOKEN_LOGOS_URL}/${toChecksummedAddress(address)}.png`
  if (address === ETHER_ADDRESS) {
    tokenIconSrc = EtherIcon
  }

  return <Image src={tokenIconSrc} size={size} alt={tokenName} onError={setImageToPlaceholder} />
}

export default TokenIcon
