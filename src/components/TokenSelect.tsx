import * as React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SelectMUI from "@material-ui/core/Select"
import TokenIcon from "./TokenIcon"

type Props = {
  items: Array<{ id: string; label: string; iconUrl?: string }>
  activeItemId: string
  onItemClick: (id: string) => void
  id?: string
}

const TokenSelect: React.FC<Props> = ({ items, activeItemId, onItemClick }) => {
  const [open, setOpen] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onItemClick(event.target.value as string)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <FormControl>
      <SelectMUI
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={activeItemId}
        onChange={handleChange}
      >
        {items.map((i) => (
          <MenuItem value={i.id} key={i.id}>
            <ListItemIcon>
              <TokenIcon tokenName={i.label} address={i.id} />
            </ListItemIcon>
            <ListItemText primary={i.label} />
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  )
}

export default TokenSelect
