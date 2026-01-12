import '../assets/css/global.css'

function Register(){
    return(
        <div>
            <div>
                <img src="#" alt="icone de cadastrar" />
                <h1>CADASTRAR NOVO USUÁRIO</h1>
                <form action="">
                    <div>
                        <label htmlFor="name">Nome:</label>
                        <input type="text" id="name" name="name" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;