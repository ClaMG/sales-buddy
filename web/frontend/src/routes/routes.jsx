import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/css/global.css'
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Login from '../pages/login'
import User from '../pages/user'
import Sales from '../pages/sales'
import Create from '../pages/create'
import Update from '../pages/update'

function Router() {
    return (
        <BrowserRouter>
        <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" 
            />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user" element={<User />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/create" element={<Create />} />
                <Route path="/update" element={<Update />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
