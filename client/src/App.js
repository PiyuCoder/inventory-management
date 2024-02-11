import "./App.css";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import Inventory from "./pages/Inventory";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { store } from "./store/store";
import SalesPage from "./pages/SalesPage";
import Invoice from "./pages/Invoice";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="sales" element={<SalesPage />} />
      <Route path="invoice" element={<Invoice />} />
    </Route>
  )
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
