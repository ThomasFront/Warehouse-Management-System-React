import { Route, Routes } from "react-router"
import { PanelLayout } from "./layouts/PanelLayout"
import { Login } from "./pages/Login"
import { Dashboard } from "./pages/Dashboard"
import { ProductList } from "./pages/Product/ProductList"
import { ProductAdd } from "./pages/Product/ProductAdd"
import { CategoryList } from "./pages/Category/CategoryList"
import { CategoryAdd } from "./pages/Category/CategoryAdd"
import { SalesHistory } from "./pages/Sales/SalesHistory"
import { SalesAdd } from "./pages/Sales/SalesAdd"
import { MyProfile } from "./pages/MyProfile"
import { MessageList } from "./pages/Message/MessageList"
import { MessageAdd } from "./pages/Message/MessageAdd"
import { UserList } from "./pages/User/UserList"
import { UserAdd } from "./pages/User/UserAdd"
import { ThemeProvider } from "@mui/material"
import { useThemeWithLanguage } from "./hooks/useThemeWithLanguage"

export const App = () => {
  const theme = useThemeWithLanguage()

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PanelLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/product-add" element={<ProductAdd />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/category-add" element={<CategoryAdd />} />
          <Route path="/sales-history" element={<SalesHistory />} />
          <Route path="/sales-add" element={<SalesAdd />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/message-list" element={<MessageList />} />
          <Route path="/message-add" element={<MessageAdd />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/user-add" element={<UserAdd />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
