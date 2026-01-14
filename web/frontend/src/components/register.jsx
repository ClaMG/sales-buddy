import '../assets/css/global.css'
import './css/register.css'


function Register({textTitle, icon, formData, setFormData,}){
    //para enviar os dados digitados no campo
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        //Fazer a logica para começa com isso//
        if(textTitle == "EDITAR USUÁRIO"){
            localStorage.getItem("usuarioUpdate")
            localStorage.getItem("nomeUpdate")
            localStorage.getItem("empresaUpdate")
            localStorage.getItem("cnpjUpdate")
            localStorage.getItem("emailUpdate")
        }
    };


    return(
        <div>
                <div className='title-register'>
                    <img src={icon} alt="icone de titulo" />
                    <p>{textTitle}</p>
                </div>
            <form action="">
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>USUÁRIO</label>
                        <input type="text" className='input-registre' name='usuario' value={formData.usuario || ''} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>NOME</label>
                        <input type="text" className='input-registre' name='nome' value={formData.nome} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>E-MAIL</label>
                        <input type="text" className='input-registre' name='email' value={formData.email} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>EMPRESA</label>
                        <input type="text" className='input-registre' name='empresa' value={formData.empresa} onChange={handleChange} required/>
                    </div>
                </div>
                <div className='group-inputs-registre'>
                    <div className='container-input-register'>
                        <label className='label-ragistre'>CNPJ</label>
                        <input type="text" className='input-registre' name='cnpj' value={formData.cnpj} onChange={handleChange} required/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Register;