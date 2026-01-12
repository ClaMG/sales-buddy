import '../assets/css/global.css'
import { useNavigate } from 'react-router-dom';


function Proof(){
    const navigate = useNavigate();
    
    async function close() {
        navigate(-1);
    }

    return (
        <div>
            <div></div>
            <div>
                <button>SALVAR</button>
                <button>IMPRIMIR</button>
                <button>FECHAR</button>
            </div>
        </div>

    );
}
export default Proof