import { Nullable } from "../../types/common"

export type FileUploaderType = {
  fileName?: string
  progress: number
  onChange: (file: Nullable<File>) => void
}