import '../assets/css/global.css'

function Register(){
    return(
        <div>
            
                <form action="">
                    <div>
                        <img src="#" alt="icone de cadastrar" />
                        <h1>CADASTRAR NOVO USUÁRIO</h1>
                    </div>
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
                </form>
        </div>
    );
}

export default Register;