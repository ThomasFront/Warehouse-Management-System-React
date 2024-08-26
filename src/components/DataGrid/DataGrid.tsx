import { DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { DataGridType } from './types';
import { Box } from '@mui/material';

export const DataGrid = ({ rows, ...props }: DataGridType) => {

  return (
    <Box
      sx={{
        width: "100%",
        height: "631px"
      }}
    >
      <MuiDataGrid
        rows={rows || []}
        rowSelection={false}
        {...props}
      />
    </Box>
  )
}
