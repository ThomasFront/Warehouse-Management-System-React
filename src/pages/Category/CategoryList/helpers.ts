import { TFunction } from "i18next";

export const categoryColumns = (t: TFunction<"translation", undefined>) => ([
  { 
    field: "id",
    headerName: "ID",
    width: 100
  },
  { 
    field: "name",
    headerName: t("Name"),
    width: 200
  },
])