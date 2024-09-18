import { Box, Pagination } from "@mui/material"
import { CustomPaginationType } from "./types";

export const CustomPagination = ({ page, meta, onChange }: CustomPaginationType) => {
  const count = Math.ceil((meta?.total || 0) / (meta?.perPage || 1));

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={3}
      data-testid="customPagination"
    >
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        color="primary"
        variant="outlined"
        size="large"
      />
    </Box>
  )
}
