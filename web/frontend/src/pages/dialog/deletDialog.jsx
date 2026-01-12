import '../../assets/css/global.css'
import './css/deletdialog.css'

function DeletDialog(){
return(
    <div className='container-body-deletDialog'>
        <div>
            <p className='text-deletDialog'>Você está prestes a excluir os seguintes usuários: </p>
            <div className='text-deletDialog negrito'></div>
            <p className='text-deletDialog'>Deseja prosseguir?</p>
        </div>
        <button className='btn-deletDialog'>SIM</button>
        <button className='btn-deletDialog no'>NÃO</button>
    </div>
)

}

export default DeletDialog