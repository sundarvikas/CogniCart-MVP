import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SellerNavbar from './components/SellerNavbar';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import './index.css';

function SellerApp() {
  return (
    <BrowserRouter>
      <SellerNavbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SellerApp;
