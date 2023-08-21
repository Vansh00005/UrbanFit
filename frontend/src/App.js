import './App.css';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Order from './pages/Order';
import OneOrder from './pages/oneOrder';
import NewProduct from './pages/Admin/adminPages/newProduct/newProduct'
import AdminPanel from './pages/Admin/adminPages/adminPanel/adminPanel'
import ProductsTable from './pages/Admin/adminPages/productsTable/productsTable'
import UsersTable from './pages/Admin/adminPages/usersTable/usersTable'
const App = () => {
  const user = useSelector((state) => state.currentUser);
 

  return (
        <Router>
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/products/*" element={<ProductList/>}/>
          {/* Version without category */}
         <Route path="/products/:category/*" element={<ProductList/>}/>       
        <Route path="/product/:id/*" element={<Product/>} />
        <Route path="/cart/*" element={<Cart />} />
        <Route path="/orders/*" element={<Order />} />
        <Route path="/newProduct/*" element={<NewProduct/>} />
        <Route path="/order/:id/*" element={<OneOrder/>} />
        <Route path="/adminPanel/*" element={<AdminPanel/>}/>
        <Route path="/productsTable/*" element={<ProductsTable/>}/>
        <Route path="/usersTable/*" element={<UsersTable/>}/>
        <Route path="/login/*" element={user ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register/*" element={user ? <Navigate to="/" replace /> : <Register />} />
      </Routes>
    </Router>
  );
};
export default App;
