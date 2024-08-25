import { FormEventHandler, ReactNode } from "react"

type SubmitButtonType = {
  name: string
  icon?: ReactNode
  loading?: boolean
}

export type FormWrapperType = {
  children: ReactNode
  submitButton: SubmitButtonType
  onSubmit: FormEventHandler<HTMLFormElement> | undefined
}