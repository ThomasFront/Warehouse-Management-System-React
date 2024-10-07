import { TFunction } from "i18next";
import { Avatar } from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { showImageAvatar } from "../../../utils/common";
import productDefaultImage from "../../../assets/images/productDefault.png"

export const productColumns = (t: TFunction) => ([
  {
    field: "id",
    headerName: "ID",
    width: 100
  },
  {
    field: "image",
    headerName: t("Image"),
    width: 150,
    filterable: false,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => {
      const image = row.image
      const productImage = image ? showImageAvatar(image) : productDefaultImage

      return <Avatar src={productImage} />
    }
  },
  {
    field: "name",
    headerName: t("Name"),
    width: 200
  },
  {
    field: "category",
    headerName: t("Category"),
    width: 200,
    sortable: false,
    renderCell: ({ row }: GridRenderCellParams) => row.category.name
  },
  {
    field: "price",
    headerName: t("Price"),
    width: 150,
    renderCell: ({ row }: GridRenderCellParams) => `${row.price} PLN`
  },
  {
    field: "stock",
    headerName: t("Stock"),
    width: 150
  },
  {
    field: "description",
    headerName: t("Description"),
    width: 200,
    filterable: false,
    sortable: false,
  },
])