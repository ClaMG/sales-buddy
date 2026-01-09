import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/css/global.css'
import Login from '../pages/login'
import User from '../pages/user'
import Sales from '../pages/sales'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user" element={<User />} />
                <Route path="/sales" element={<Sales />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
