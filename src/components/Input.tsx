import React from "react"
import TextField from "@material-ui/core/TextField"

interface OwnProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<OwnProps> = ({ value, onChange }) => (
  <TextField variant="outlined" placeholder="0" onChange={onChange} value={value} />
)

export default Input
