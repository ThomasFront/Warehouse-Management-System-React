import { TFunction } from "i18next";

export const roleOptions = (t: TFunction) => ([
  {
    label: t("Admin"),
    value: "admin"
  },
  {
    label: t("User"),
    value: "user"
  }
])