import { useState } from "react"
import { useNavigate } from "react-router"
import { useTranslation } from "react-i18next"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List, useTheme } from "@mui/material"
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import { MenuItemProps } from "./types"
import { handleMenuItemIcon } from "../helpers"

export const MenuItem = ({ item, currentPathname }: MenuItemProps) => {
  const { name, sublinks, url } = item
  const { t } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const [isItemExpanded, setIsItemExpanded] = useState(false)
  const isHighlighted = currentPathname === url || sublinks?.some(({ url }) => url === currentPathname)
  const highlightColor = theme.palette.primary.light
  const secondaryColor = theme.palette.secondary.main

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
        sx={{
          bgcolor: isHighlighted ? highlightColor : null,
          color: secondaryColor
        }}
      >
        <ListItemButton>
          <ListItemIcon sx={{ color: secondaryColor }}>
            {handleMenuItemIcon(name)}
          </ListItemIcon>
          <ListItemText primary={t(name)} />
          {sublinks && (isItemExpanded ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      {sublinks && (
        <Collapse in={isItemExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {sublinks.map(({ id, url, name }) => {
              const isSublinkHighlighted = currentPathname === url

              return (
                <ListItemButton
                  key={id}
                  onClick={() => url && navigate(url)}
                  sx={{
                    pl: 4,
                    bgcolor: isSublinkHighlighted ? highlightColor : null,
                    color: secondaryColor
                  }}
                >
                  <ListItemIcon sx={{ color: secondaryColor }}>
                    {handleMenuItemIcon(name)}
                  </ListItemIcon>
                  <ListItemText primary={t(name)} />
                </ListItemButton>
              )
            })}
          </List>
        </Collapse>
      )}
    </>
  )
}
