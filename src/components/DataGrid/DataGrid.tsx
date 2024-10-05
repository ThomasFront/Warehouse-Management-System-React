import { useEffect, useState } from 'react';
import { GridFilterModel, GridSortModel, DataGrid as MuiDataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGridType } from './types';
import { getDataGrid } from '../../api/dataGrid';
import { ApiCollectionResponse } from '../../types/axios';
import "./styles.css"

export const DataGrid = <T,>({ endpoint, csvExport, ...props }: DataGridType) => {
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(25)
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  const [filterModel, setFilterModel] = useState<GridFilterModel['items']>([])

  const { data, isLoading, isError, refetch, isRefetching } = useQuery({
    queryKey: [endpoint],
    queryFn: () => getDataGrid<ApiCollectionResponse<T>>(endpoint, page, pageSize, sortModel, filterModel),
  })

  useEffect(() => {
    refetch()
  }, [page, pageSize, sortModel, filterModel, refetch])

  if (isError) {
    toast.error(t("An error occurred while downloading data"))
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "631px"
      }}
    >
      {csvExport && (
        <Box
          display="flex"
          justifyContent="end"
        >
          <LoadingButton
            startIcon={<DownloadIcon />}
            loading={csvExport.isLoading}
            onClick={csvExport.action}
            sx={{
              width: "200px"
            }}
          >
            {t("CSV Export")}
          </LoadingButton>
        </Box>
      )}
      <MuiDataGrid
        rows={data?.data || []}
        loading={isLoading || isRefetching}
        rowSelection={false}
        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : ""}
        rowCount={data?.meta.total || 0}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationMode="server"
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize
            }
          }
        }}
        onPaginationModelChange={({ pageSize, page }) => {
          setPage(page)
          setPageSize(pageSize)
        }}
        onSortModelChange={sortData => setSortModel(sortData)}
        onFilterModelChange={filterModel => setFilterModel(filterModel['items'])}
        {...props}
      />
    </Box>
  )
}
