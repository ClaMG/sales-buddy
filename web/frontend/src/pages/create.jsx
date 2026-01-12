import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import Btns from '../components/btns.jsx';
import refresh from '../assets/icons-btn/refresh.png'
import save from '../assets/icons-btn/save.png'
import './css/base.css'
import './css/btnBlue.css'
import './css/btnGray.css'


function Create(){
    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                <div className="table-container">
                    <Register />
                </div>
                    <div className='.btn-container-cant'>
                        <Btns
                            classNameIcon1="btn-gray-icon"
                            image1={refresh}
                            onClick1={() => {}} 
                            className1="btn-gray"
                            text1="RESETAR SENHA"
                            classNameIcon2="btn-blue-icon"
                            image2={save}
                            onClick2={() => {}} 
                            className2="btn-blue"
                            text2="SALVAR ALTERAÇÕES"
                        />
                    </div>
            </div>
        </div>
    );
}

export default Create;