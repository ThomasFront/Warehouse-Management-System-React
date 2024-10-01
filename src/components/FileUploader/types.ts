import { Nullable } from "../../types/common"

export type FileUploaderType = {
  label: string
  fileName?: string
  progress: number
  onChange: (file: Nullable<File>) => void
}