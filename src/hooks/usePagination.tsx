import { useState } from "react";
import { MetaType } from "../types/axios";

export const usePagination = (meta?: MetaType) => {
  const [page, setPage] = useState(1)
  const count = Math.ceil((meta?.total || 0) / (meta?.perPage || 0))

  const onPageChange = (page: number) => setPage(page)

  return {
    page,
    count,
    onPageChange
  }
}
