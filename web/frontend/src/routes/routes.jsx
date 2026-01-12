import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/css/global.css'
import Login from '../pages/login'
import User from '../pages/user'
import Sales from '../pages/sales'
import Create from '../pages/create'
import Update from '../pages/update'
import Apagar from '../pages/dialog/proof'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/user" element={<User />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/create" element={<Create />} />
                <Route path="/update" element={<Update />} />
                <Route path="/teste" element={<Apagar />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
