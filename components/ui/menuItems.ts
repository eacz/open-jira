import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'

interface MenuItem {
  text: string
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string
  }
}

const menuItems: MenuItem[] = [
  { text: 'Inbox', Icon: InboxOutlinedIcon },
  { text: 'Starred', Icon: StarOutlinedIcon },
  { text: 'Send Email', Icon: EmailOutlinedIcon },
  { text: 'Drafts', Icon: ModeOutlinedIcon },
]

export default menuItems
