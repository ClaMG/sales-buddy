import '../assets/css/global.css'
import add from'../assets/icons-title/add_blue.svg'
import './css/register.css'

function Register(){
    return(
        <div>
                <form action="">
                    <div className='title-register'>
                        <img src={add} alt="icone de cadastrar" />
                        <p>CADASTRAR NOVO USUÁRIO</p>
                    </div>
                    <div className='inputs-registre'>
                        <div>
                            <label htmlFor="user">Usuario:</label>
                            <input type="text" id="user" name="user" />
                        </div>
                        <div>
                            <label htmlFor="name">Nome:</label>
                            <input type="text" id="name" name="name" />
                        </div>
                        <div>
                            <label htmlFor="company">Empresa:</label>
                            <input type="text" id="company" name="company" />
                        </div>
                        <div>
                            <label htmlFor="cnpj">CNPJ:</label>
                            <input type="text" id="cnpj" name="cnpj" />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" id="email" name="email" />
                        </div>
                    </div>
                </form>
        </div>
    );
}

export default Register;