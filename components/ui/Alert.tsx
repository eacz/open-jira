import { forwardRef } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

interface Props {
  open: boolean
  title: string

  confirmText?: string
  cancelText?: string
  description?: string

  setOpen: (open: boolean) => void
  onConfirm: () => void
  onClose?: () => void
}

export default function AlertDialogSlide({
  cancelText = 'Cancel',
  confirmText = 'Accept',
  onClose,
  onConfirm,
  open,
  setOpen,
  title,
  description,
}: Props) {
  const handleClose = () => {
    onClose && onClose()
    setOpen(false)
  }

  const handleConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{cancelText}</Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
