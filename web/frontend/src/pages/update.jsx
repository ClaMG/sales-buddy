import '../assets/css/global.css'
import SideMenu from '../components/sideMenu.jsx'
import Register from '../components/register.jsx';
import Btns from '../components/btns.jsx';
import './css/base.css'
import './css/btnBlue.css'
import './css/btnGray.css'
import refresh from '../assets/icons-btn/refresh.png'
import save from '../assets/icons-btn/save.png'
import titleIcon from '../assets/icons-btn/edit.png'
import useUpdateActive from '../hooks/updateActivite.jsx'
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

function Update(){
    const navigate = useNavigate();
    const{handleSave , error, updatePassword}= useUpdateActive()
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
                const id = localStorage.getItem("idUpdate")
                const success = await handleSave( id, values.usuario, values.nome, values.empresa, values.cnpj, values.email  );
           
                if(success){
                    toast.update(idToast, { 
                    render: "Usuário atualizado!", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                    navigate('/user')
                    return
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
    
        async function password(){
            const toastId = toast.loading("Resetando senha...");
            const success = await updatePassword();

            if(success){
                toast.update(toastId, { 
                    render: "Senha resetada com sucesso, confira seu email", 
                    type: "success", 
                    isLoading: false, 
                    autoClose: 2000 
                });
                 navigate('/user')
                return
            }else{
                toast.update(toastId, { 
                render: error || "Erro ao atualizar senha", 
                type: "error",
                isLoading: false, 
                autoClose: 3000 
            }); 
            }
        }

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
                        classNameIconPrimaryButton="btn-blue-icon"
                        imageIconPrimaryButton={refresh}
                        actionPrimaryButton={password} 
                        classNamePrimaryButton="btn-blue"
                        textPrimaryButton="RESETAR SENHA"
                        typePrimaryButton="button"
                        desablitPrimaryButton={false}

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
                        textTitle={"EDITAR USUÁRIO"}
                        icon={titleIcon}
                        formik={formik}
                    />
                </div>
            
            </div>
        </div>
    );
}

export default Update;