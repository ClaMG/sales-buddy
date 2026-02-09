import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import Btns from '../components/btns.jsx';
import refresh from '../assets/icons-btn/refresh.png'
import save from '../assets/icons-btn/save.png'
import './css/base.css'
import './css/btnBlue.css'
import './css/btnGray.css'
import titleIcon from '../assets/icons-title/add_blue.svg'
import useRegisterActivite from '../hooks/registerActive.jsx'
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    usuario: Yup.string().required('Preencha o campo Usuário'),
    nome: Yup.string().required('Preencha o campo Nome'),
    email: Yup.string().email('E-mail inválido').required('Preencha o campo E-mail'),
    empresa: Yup.string().required('Preencha o campo Empresa'),
    cnpj: Yup.string().min(18, 'CNPJ incompleto').required('Preencha o campo CNPJ'),
});

function Create(){
    const {handleSave, error} = useRegisterActivite()
    const navigate = useNavigate()

    

    const formik = useFormik({
        initialValues: {
            usuario: '',
            nome: '',
            email: '',
            empresa: '',
            cnpj: ''
        },
        validationSchema: validationSchema,
        validateOnChange: false, // Evita poluição de toasts enquanto digita
        validateOnBlur: false,
        onSubmit: async (values) => {
            const idToast = toast.loading("Carregando...");
            const success = await handleSave( values.usuario, values.nome, values.empresa, values.cnpj, values.email  );

        if(success){
            toast.update(idToast, { 
            render: "Usuário cadastrado com sucesso, confira seu email para a senha", 
            type: "success",
            isLoading: false, 
            autoClose: 2000 
        });
            navigate('/user')
            return;
        }else{
             toast.update(idToast, { 
            render: error || "Erro ao atualizar", 
            type: "error",
            isLoading: false, 
            autoClose: 3000 
        }); 
        }
        }
    });

    const handleValidationErrors = () => {
        if (!formik.isValid) {
            const firstError = Object.values(formik.errors)[0];
            if (firstError) toast.error(firstError);
        }
    };

    
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return null; 
    }

    return(
        <div className="page-container">
            <SideMenu />
            <div className="content-container">
                <div className='btn-container-create'>
                    <Btns
                        classNameIconPrimaryButton="btn-gray-icon"
                        imageIconPrimaryButton={refresh}
                        actionPrimaryButton={() => {}} 
                        classNamePrimaryButton="btn-gray"
                        textPrimaryButton="RESETAR SENHA"
                        typePrimaryButton="button"
                        desablitPrimaryButton={true}

                        classNameIconSecondButton="btn-blue-icon"
                        imageIconSecondButton={save}
                        onClickSecondButton={() => {
                            handleValidationErrors();
                            formik.handleSubmit();
                        }} 
                        classNameSecondButton="btn-blue"
                        textSecondButton="SALVAR ALTERAÇÕES"
                        typeSecondButton="submit"
                        desablitSecondButton={false}
                    />
                </div>
                <div className="table-container">
                    <Register 
                        textTitle={ "CADASTRAR NOVO USUÁRIO"}
                        icon={titleIcon}
                        formik={formik}
                    />
                </div>
            </div>
        </div>
    );
}

export default Create;