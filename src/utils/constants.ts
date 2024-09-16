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

export const messagePriorityOptions = (t: TFunction) => ([
  {
    label: t("High"),
    value: "high"
  },
  {
    label: t("Medium"),
    value: "medium"
  },
  {
    label: t("Low"),
    value: "low"
  }
])
