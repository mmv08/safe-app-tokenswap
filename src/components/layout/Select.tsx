import React from "react"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import SelectMUI from "@material-ui/core/Select"

type Props = {
  items: Array<{ id: string; label: string; iconUrl?: string }>
  activeItemId: string
  onItemClick: (id: string) => void
  id?: string
}

function Select({ items, activeItemId, onItemClick }: Props) {
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
      <SelectMUI open={open} onClose={handleClose} onOpen={handleOpen} value={activeItemId} onChange={handleChange}>
        {items.map((i) => (
          <MenuItem value={i.id} key={i.id}>
            {i.iconUrl && <img alt={i.label} src={i.iconUrl} />}
            <span>{i.label}</span>
          </MenuItem>
        ))}
      </SelectMUI>
    </FormControl>
  )
}

export default Select
