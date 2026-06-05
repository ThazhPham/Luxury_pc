import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ProductPage from "../pages/products/ProductPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<ProductPage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
