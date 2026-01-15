import '../../assets/css/global.css'
import './css/proof.css'
import {exportarPDF, handlePrint}  from '../../utils/proofUtils'
import useComprovanteActive from '../../hooks/comprovanteActive'
import { toast } from 'react-toastify';
import { useEffect } from 'react';


function Proof(){
    const{getComprovante, sales, error} = useComprovanteActive()

     useEffect(() => {
        getComprovante()
        if (error) {
            toast.error(error); 
        }
    }, []);

    return (
        <div className='container-body-proof'>
            <div className='containe-head-proof'>
                <div className='container-beige-proof' id='relatorio-final' >
                {
                sales.map((user) => (
                        <div key={user.id} className='container-info-proof'>
                            <div>
                                <div className='container-primary-proof'>
                                    <div>
                                        <p className='title-camp-proof'>Nome</p>
                                        <p className='connoteudo-camp-proof'>sla</p>
                                    </div>
                                    <div>
                                        <p className='title-camp-proof'>CPF</p>
                                        <p className='connoteudo-camp-proof'>{user.cpf}</p>
                                    </div>
                                    <div>
                                        <p className='title-camp-proof'>E-mail</p>
                                        <p className='connoteudo-camp-proof'>{user.email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div>
                                    <table className='table-proof'>
                                        <thead>
                                            <tr>
                                                <th className='title-camp-proof'>Itm</th>
                                                <th className='title-camp-proof'>Descrição</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='connoteudo-camp-proof'>{user.item?.id}</td>
                                                <td className='connoteudo-camp-proof'>{user.item?.descricao}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Valor recebido</p>
                                        <p className='title-camp-proof'>1</p>
                                    </div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Valor venda</p>
                                        <p className='title-camp-proof'>2</p>
                                    </div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Troco devido</p>
                                        <p className='title-camp-proof'>{user.troco}</p>
                                    </div>
                                </div>
                            </div>
                            <p className='sales-id-proof'>Venda nº{user.id}</p>
                        </div>
                    )
                )
                }
                
                </div>
                <div className='group-btn-proof no-print'>
                    <button className='btn-blue-proof' onClick={()=> exportarPDF('relatorio-final')}>SALVAR</button>
                    <button className='btn-blue-proof' onClick={handlePrint}>IMPRIMIR</button>
                    <button className='btn-red-proof'>FECHAR</button>
                </div>
            </div>
        </div>

    );
}
export default Proof