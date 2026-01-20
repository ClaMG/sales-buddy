import '../../assets/css/global.css'
import './css/proof.css'
import {exportarPDF, handlePrint}  from '../../utils/proofUtils'
import useProofActive from '../../hooks/comprovanteActive'
import { toast } from 'react-toastify';
import { useEffect } from 'react';


function ProofDialog({isOpen, onClose, saleId }){
    const{getProof, sale, error} = useProofActive ()

    
    useEffect(() => {
        console.log("=== PROOF DIALOG: useEffect disparado ===");
        console.log("ID da venda recebido via props:", saleId);
        if (isOpen && saleId) {
            getProof(saleId);
        }
        if (error) {
            toast.error(error); 
        }

    }, [isOpen, saleId]);


    console.log("=== RENDERIZAÇÃO PROOF DIALOG ===");
    console.log("Estado 'isOpen':", isOpen);
    console.log("Dados atuais da venda (sale):", sale);


    if (!sale) {
        return (
            <div className='container-body-proof'>
                <div className='container-beige-proof' style={{padding: '20px', textAlign: 'center'}}>
                    <p>Carregando dados da venda...</p>
                    <button className='btn-red-proof' onClick={onClose}>FECHAR</button>
                </div>
            </div>
        );
    }

    return (
        <div className='container-body-proof'>
            <div className='containe-head-proof'>
                <div className='container-beige-proof' id='relatorio-final' >
                        <div className='container-info-proof'>
                            <div>
                                <div className='container-primary-proof'>
                                    <div>
                                        <p className='title-camp-proof'>Nome</p>
                                        <p className='connoteudo-camp-proof'>{sale.nome}</p>
                                    </div>
                                    <div>
                                        <p className='title-camp-proof'>CPF</p>
                                        <p className='connoteudo-camp-proof'>{sale.cpf}</p>
                                    </div>
                                    <div>
                                        <p className='title-camp-proof'>E-mail</p>
                                        <p className='connoteudo-camp-proof'>{sale.email}</p>
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
                                            {sale.itens && sale.itens.map((item) => ( 
                                            <tr key={item.id}> 
                                                <td className='connoteudo-camp-proof'>{item.id}</td> 
                                                <td className='connoteudo-camp-proof'>{item.descricao}</td> </tr> 
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <hr />
                                <div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Valor recebido</p>
                                        <p className='title-camp-proof'>{sale.valor_recebido}</p>
                                    </div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Valor venda</p>
                                        <p className='title-camp-proof'>{sale.valor_venda}</p>
                                    </div>
                                    <div className='container-valor'>
                                        <p className='title-camp-proof-valor'>Troco devido</p>
                                        <p className='title-camp-proof'>{sale.troco}</p>
                                    </div>
                                </div>
                            </div>
                            <p className='sales-id-proof'>Venda nº{sale.id}</p>
                        </div>
                </div>
                <div className='group-btn-proof no-print'>
                    <button className='btn-blue-proof' onClick={()=> exportarPDF('relatorio-final')}>SALVAR</button>
                    <button className='btn-blue-proof' onClick={handlePrint}>IMPRIMIR</button>
                    <button className='btn-red-proof' onClick={onClose}>FECHAR</button>
                </div>
            </div>
        </div>

    );
}
export default ProofDialog
