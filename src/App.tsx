import { Route, Routes } from "react-router"
import { LoginPage } from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { PanelLayout } from "./layouts/PanelLayout"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<PanelLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
