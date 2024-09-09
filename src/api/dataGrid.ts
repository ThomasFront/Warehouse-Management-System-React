import { GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { backendApi } from "../config/axios";

export const getDataGrid = <T>(
  endpoint: string,
   page: number,
   pageSize: number,
   sortModel: GridSortModel,
   filterModel: GridFilterModel['items']) => backendApi.get<T>(endpoint, {
    params: {
      page: page + 1,
      pageSize,
      sortField: sortModel[0]?.field,
      sortOrder: sortModel[0]?.sort,
      filterField: filterModel[0]?.field,
      filterValue: filterModel[0]?.value,
      filterOperator: filterModel[0]?.operator
    }}).then(({data}) => data)