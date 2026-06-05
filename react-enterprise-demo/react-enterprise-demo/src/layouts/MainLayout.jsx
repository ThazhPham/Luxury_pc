import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <h1>Enterprise React App</h1>
      <Outlet />
    </div>
  );
}

export default MainLayout;
