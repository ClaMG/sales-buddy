import '../../assets/css/global.css'
import './css/deletdialog.css'
import useDeletActive from '../../hooks/deletActive'
import { toast } from 'react-toastify';



function DeletDialog({isOpen, onClose}){
    const {handleSave, error} = useDeletActive()
    const arrayIds = localStorage.getItem('arrayIds')
    const ids = arrayIds ? JSON.parse(arrayIds).map(Number) : [];

    if(!isOpen){
        return null
    }
    
    async function handleSubmit(){
        const idUser= 1

        const success = await handleSave( ids, idUser);

        if(success){
            toast.success("Usuário deletados com sucesso!");
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
                    <p>{ids}</p>
                    <p>{ids}</p>
                    <p>{ids}</p>
                </div>
                <p className='text-deletDialog'>Deseja prosseguir?</p>
            </div>
            <div className='group-btn-deletDialog'>
                <button className='btn-deletDialog' onClick={()=> (handleSubmit())}>SIM</button>
                <button className='btn-deletDialog no' onClick={onClose}>NÃO</button>
            </div>
        </div>
    </div>
)

}

export default DeletDialog