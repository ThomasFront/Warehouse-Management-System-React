import { GridRenderCellParams } from "@mui/x-data-grid";
import { TFunction } from "i18next";
import { formatDateTimeToDisplay, showImageAvatar } from "../../../utils/common";
import productDefaultImage from "../../../assets/images/productDefault.png"
import { Avatar, Box } from "@mui/material";

export const saleColumns = (t: TFunction) => ([
  {
    field: "id",
    headerName: "ID",
    width: 100
  },
  {
    field: "productName",
    headerName: t("Product"),
    width: 200,
    filterable: false,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      const image = row.product.image
      const productImage = image ? showImageAvatar(image) : productDefaultImage

      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={productImage} />
          {row.product.name}
        </Box>
      )
    }
  },
  {
    field: "quantity",
    headerName: t("Quantity"),
    width: 200
  },
  {
    field: "salePrice",
    headerName: t("Sales price"),
    width: 200,
    filterable: false,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => `${row.product.price} PLN`
  },
  {
    field: "totalPrice",
    headerName: t("Total price"),
    width: 200,
    filterable: false,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => `${row.totalPrice} PLN`
  },
  {
    field: "createdAt",
    headerName: t("Created at"),
    width: 200,
    renderCell: ({ row }: GridRenderCellParams) => formatDateTimeToDisplay(row.createdAt)
  },
])