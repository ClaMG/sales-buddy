import '../assets/css/global.css'
import './css/register.css'

function Register({textTitle, icon}){
    return(
        <div>
                <div className='title-register'>
                    <img src={icon} alt="icone de cadastrar" />
                    <p>{textTitle}</p>
                </div>
            <form action="">
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>USUÁRIO</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>NOME</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>E-MAIL</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>EMPRESA</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>CNPJ</label>
                        <input type="text" className='input-registre'/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;