import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { withStyles } from "@material-ui/core/styles"

export const StyledTabs = withStyles({
  root: {
    paddingBottom: 20,
  },
  indicator: {
    backgroundColor: "#008C73",
  },
})(Tabs)

export const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: 16,
    marginRight: theme.spacing(4),
    fontFamily: "Averta",
    "&:hover": {
      color: "#005546",
      opacity: 1,
    },
    "&$selected": {
      color: "#008C73",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#008C73",
    },
  },
}))((props) => <Tab disableRipple {...props} />)
