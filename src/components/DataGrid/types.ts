import { DataGridProps } from "@mui/x-data-grid";

export type DataGridType = Omit<DataGridProps, 'rows'> & {
  rows?: DataGridProps['rows']
}