import * as React from "react"
import { VariableSizeList, ListChildComponentProps } from "react-window"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"
import Autocomplete, { AutocompleteRenderGroupParams } from "@material-ui/lab/Autocomplete"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import ListSubheader from "@material-ui/core/ListSubheader"
import { useTheme } from "@material-ui/core/styles"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import TokenIcon from "./TokenIcon"

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
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true })
  const itemCount = itemData.length
  const itemSize = smUp ? 36 : 48

  const getChildSize = (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === ListSubheader) {
      return 48
    }

    return itemSize
  }

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize
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
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  )
})

const renderGroup = (params: AutocompleteRenderGroupParams) => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
]

interface ItemProps {
  id: string
  label: string
}

interface TokenProps extends ItemProps {
  balance?: string
}

interface Props {
  tokens: Array<TokenProps>
  activeItemId: string
  onItemClick: (id: string) => void
  id?: string
}

const TokenSelect: React.FC<Props> = ({ tokens }) => {
  return (
    <Autocomplete
      style={{ width: 300 }}
      disableListWrap
      ListboxComponent={ListboxComponent as React.ComponentType<React.HTMLAttributes<HTMLElement>>}
      renderGroup={renderGroup}
      getOptionLabel={(option) => option.label}
      options={tokens}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Enter token name or symbol" />
      )}
      renderOption={(option) => (
        <>
          <ListItemIcon>
            <TokenIcon tokenName={option.label} address={option.id} />
          </ListItemIcon>
          <ListItemText primary={option.label} secondary={option.balance || ""} />
        </>
      )}
    />
  )
}

export default TokenSelect
