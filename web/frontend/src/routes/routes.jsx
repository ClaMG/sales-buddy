import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../assets/css/global.css'
import Login from '../pages/login'

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Router;
