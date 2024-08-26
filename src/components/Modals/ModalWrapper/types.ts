import { ReactNode } from "react"

export type ModalWrapperType = {
  title: string
  children: ReactNode
  disagreeButton?: {
    text: string
    onClick: () => void
    icon?: ReactNode
  },
  agreeButton?: {
    text: string
    onClick?: () => void
    icon?: ReactNode
    loading?: boolean
  }
} & CommonModalType

export type CommonModalType = {
  isOpen: boolean
  onClose: () => void
}