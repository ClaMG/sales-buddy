import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import './css/base.css'


function Create(){
    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                <div className="table-container">
                    <Register />
                </div>
            </div>
        </div>
    );
}

export default Create;