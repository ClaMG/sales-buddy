import '../../assets/css/global.css'
import './css/deletdialog.css'
import useDeletActive from '../../hooks/deletActive'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function DeletDialog(){
    const {handleSave, error} = useDeletActive()
    const navigate = useNavigate()
    const tes = "sllslsl"
    
    
    async function handleSubmit(){
        const arrayIds = localStorage.getItem('arrayIds')
        const ids = arrayIds ? JSON.parse(arrayIds).map(Number) : [];
        const idUser= 1
        console.log(`dialog: ${ids}`)

        const success = await handleSave( ids, idUser);
        console.log(`user ${ids}, ${idUser}`)

        if(success){
            toast.success("Usuário deletados com sucesso!");
            navigate('/user')
            return;
        }


        if (error) {
            toast.error(error); 
        }
     }

     
return(
    <div className='container-body-deletDialog'>
        <div className='container-head-deletDialog'>
            <div className='group-text-deletDialog'>
                <p className='text-deletDialog'>Você está prestes a excluir os seguintes usuários: </p>
                <div className='text-deletDialog negrito'>
                    <p>{tes}</p>
                    <p>{tes}</p>
                    <p>{tes}</p>
                </div>
                <p className='text-deletDialog'>Deseja prosseguir?</p>
            </div>
            <div className='group-btn-deletDialog'>
                <button className='btn-deletDialog' onClick={()=> (handleSubmit())}>SIM</button>
                <button className='btn-deletDialog no'>NÃO</button>
            </div>
        </div>
    </div>
)

}

export default DeletDialog