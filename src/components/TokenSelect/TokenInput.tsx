import React from "react"
import TextField from "@material-ui/core/TextField"
import { AutocompleteRenderInputParams } from "@material-ui/lab/Autocomplete"
import InputAdornment from "@material-ui/core/InputAdornment"
import TokenIcon from "components/TokenIcon"
import { TokenProps } from "."

interface Props {
  params: AutocompleteRenderInputParams
  activeItem: TokenProps | null
}

const TokenInput: React.FC<Props> = ({ params, activeItem }) => {
  return (
    <TextField
      {...params}
      variant="outlined"
      label="Enter token name or symbol"
      InputProps={{
        ...params.InputProps,
        startAdornment: activeItem ? (
          <InputAdornment position="start">
            <TokenIcon size={24} tokenName={activeItem.label} address={activeItem.id} />
          </InputAdornment>
        ) : null,
      }}
    />
  )
}

export default TokenInput
