import * as React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { VariableSizeList, ListChildComponentProps } from "react-window"
import Autocomplete from "@material-ui/lab/Autocomplete"
import ListSubheader from "@material-ui/core/ListSubheader"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import TokenInput from "./TokenInput"
import TokenIcon from "../TokenIcon"

const useStyles = makeStyles({
  listbox: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
})

const LISTBOX_PADDING = 8 // px

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  })
}

const OuterElementContext = React.createContext({})

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: any) {
  const ref = React.useRef<VariableSizeList>(null)
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
const ListboxComponent = React.forwardRef<HTMLDivElement>(function ListboxComponent(props, ref) {
  const { children, ...other } = props
  const itemData = React.Children.toArray(children)
  const itemCount = itemData.length
  const itemSize = 48

  const getChildSize = (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 4) {
      return 4 * itemSize
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0)
  }

  const gridRef = useResetCache(itemCount)

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={8}
          width="100%"
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

interface ItemProps {
  id: string
  label: string
}

export interface TokenProps extends ItemProps {
  balance?: string
}

interface Props {
  tokens: Array<TokenProps>
  activeItem: TokenProps | null
  onItemClick: (e: React.ChangeEvent<unknown>, id: TokenProps | null) => void
  id?: string
  disabled?: boolean
}

const TokenSelect: React.FC<Props> = ({ tokens, activeItem, onItemClick, disabled = false }) => {
  const classes = useStyles()

  return (
    <Autocomplete
      openOnFocus
      value={activeItem}
      disabled={disabled}
      onChange={onItemClick}
      style={{ width: 300 }}
      disableListWrap
      classes={classes}
      noOptionsText="There are no tokens available"
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      getOptionLabel={(option: TokenProps): string => option.label || ""}
      getOptionSelected={(option: TokenProps, value: TokenProps): boolean => option.id === value.id}
      options={tokens}
      renderInput={(params) => <TokenInput params={params} activeItem={activeItem} />}
      renderOption={(option) => (
        <>
          <ListItemIcon>
            <TokenIcon size={24} tokenName={option.label} address={option.id} />
          </ListItemIcon>
          <ListItemText primary={option.label} secondary={option.balance || ""} />
        </>
      )}
    />
  )
}

export default TokenSelect
