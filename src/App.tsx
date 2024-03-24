import "./global.css";

import { Home } from "./pages";
import ProductsPage from "./pages/product/list";
import OrdersManagement from "./pages/orders/orders";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <MainLayout>
              {/* Wrap the routes inside the MainLayout component */}
              <Outlet />
            </MainLayout>
          }
        >
          <Route index element={<Home />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
