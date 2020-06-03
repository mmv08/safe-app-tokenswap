import * as React from "react"
import TokenPlaceholder from "assets/token_placeholder.svg"

const setImageToPlaceholder = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  ;(e.target as HTMLImageElement).onerror = null
  ;(e.target as HTMLImageElement).src = TokenPlaceholder
}

export { setImageToPlaceholder }
