import { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from "@mui/material"
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { MenuItemProps } from "./types"
import { handleMenuItemIcon } from "../helpers"

export const MenuItem = ({ item }: MenuItemProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { name, sublinks, url } = item
  const [isItemExpanded, setIsItemExpanded] = useState(false)

  const handleToggleSublinks = () => {
    if (sublinks) {
      setIsItemExpanded(!isItemExpanded)
    } else if (url) {
      navigate(url)
    }
  }

  return (
    <>
      <ListItem
        disablePadding
        onClick={handleToggleSublinks}
      >
        <ListItemButton>
          <ListItemIcon>
            {handleMenuItemIcon(name)}
          </ListItemIcon>
          <ListItemText primary={t(name)} />
          {sublinks && (isItemExpanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {sublinks && (
        <Collapse in={isItemExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {sublinks.map(({ id, url, name }) => (
              <ListItemButton
                key={id}
                sx={{ pl: 4 }}
                onClick={() => url && navigate(url)}
              >
                <ListItemIcon>
                  {handleMenuItemIcon(name)}
                </ListItemIcon>
                <ListItemText primary={t(name)} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      )}
    </>
  )
}
