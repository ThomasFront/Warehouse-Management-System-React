import { Route, Routes } from "react-router"
import { PanelLayout } from "./layouts/PanelLayout"
import { LoginPage } from "./pages/LoginPage"
import { DashboardPage } from "./pages/DashboardPage"
import { ProductList } from "./pages/ProductList"
import { ProductAdd } from "./pages/ProductAdd"
import { CategoryList } from "./pages/CategoryList"
import { CategoryAdd } from "./pages/CategoryAdd"
import { SalesHistory } from "./pages/SalesHistory"
import { SalesAdd } from "./pages/SalesAdd"
import { MyProfile } from "./pages/MyProfile"
import { MessageList } from "./pages/MessageList"
import { MessageAdd } from "./pages/MessageAdd"
import { UserList } from "./pages/UserList"
import { UserAdd } from "./pages/UserAdd"

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<PanelLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
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
  )
}
