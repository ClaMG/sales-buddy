import '../../assets/css/global.css'
import './css/deletdialog.css'
import useDeletActive from '../../hooks/deletActive'
import { toast } from 'react-toastify';
import {useEffect} from 'react';


function DeletDialog({isOpen, onClose}){
    const {handleSave, error, names, getDelet} = useDeletActive()


    useEffect(() => {
        if (isOpen) {
            const arrayIds = localStorage.getItem('arrayIds');
            const ids = arrayIds ? JSON.parse(arrayIds).map(Number) : [];
            
            if (ids.length > 0) {
                getDelet(ids);
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if(!isOpen){
        return null
    }
    
    async function handleSubmit(){
        const arrayIds = localStorage.getItem('arrayIds');
        const ids = arrayIds ? JSON.parse(arrayIds).map(Number) : [];
        
        const success = await handleSave( ids);

        if(success){
            toast.success("Usuário deletados com sucesso!");
            onClose()
            setTimeout(() => {
                window.location.reload();
            }, 4000);
            
        }else{
            onClose()
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }

        if (error) {
            toast.error(error); 
            onClose()
        }
     }

     
return(
    <div className='container-body-deletDialog'>
        <div className='container-head-deletDialog'>
            <div className='group-text-deletDialog'>
                <p className='text-deletDialog'>Você está prestes a excluir os seguintes usuários: </p>
                <div className='text-deletDialog negrito'>
                     <ul > 
                        {names.map((nome, index) => ( 
                            <li key={index}>{nome}</li>
                        ))} 
                    </ul>

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