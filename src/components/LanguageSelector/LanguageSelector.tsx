import { useState } from "react";
import { useTranslation } from "react-i18next";
import ReactFlagsSelect from "react-flags-select";
import i18n from "../../config/i18next";
import "./styles.css"

export const LanguageSelector = () => {
  const { t } = useTranslation()
  const localStorageLanguage = localStorage.getItem("lang")
  const [selectedLanguage, setSelectedLanguage] = useState(localStorageLanguage === "en" ? "GB" : "PL")

  const changeLanguage = (code: string) => {
    setSelectedLanguage(code)
    const language = code === "PL" ? "pl" : "en"
    i18n.changeLanguage(language)
    localStorage.setItem("lang", language)
  }

  return (
    <ReactFlagsSelect
      selected={selectedLanguage}
      placeholder={t("Selected language")}
      onSelect={changeLanguage}
      countries={["PL", "GB"]}
      customLabels={{ PL: "PL", GB: "EN" }}
      className="menu-flags"
    />
  )
}
