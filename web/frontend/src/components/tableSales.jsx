import  { useEffect } from 'react';
import '../assets/css/global.css'
import './css/tables.css'
import './css/tableSales.css'
import comprovanteIcon from '../assets/icons-btn/receipt.svg'
import ProofDialog from '../pages/dialog/proof';
import useTableSalesActive from '../hooks/tableSalesActive'
import { toast } from 'react-toastify';

function TableSales() {
    const { getSales, sales, error, abrirComprovante } = useTableSalesActive() 
    
    useEffect(() => {
        getSales();
        if (error) {
            toast.error(error); 
        }
    }, []);
    return (
        <div>
                       
            
        <table className='table-sales table-base'>
            <thead className='thead'>
                <tr>
                    <th>ID.VENDA</th>
                    <th>NOME</th>
                    <th>CPF</th>
                    <th>E-MAIL</th>
                    <th className='sales-center'>QTD.ITENS</th>
                    <th className='sales-center'>VALOR</th>
                    <th className='sales-center'>TROCO</th>
                    <th>COMPROVANTE</th>
                </tr>
            </thead>
            <tbody className='tbody'>
                
                {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td className='sales-field sales-center'>{sale.id}</td>
                            <td className='sales-field'>{sale.nome}</td>
                            <td>{sale.cpf}</td>
                            <td>{sale.email}</td>
                            <td className='sales-center'>{sale.quantidade}</td>
                            <td className='sales-center'>{sale.valor_venda}</td>
                            <td className='sales-center'>{sale.troco}</td>
                            <td className='sales-center'>
                                <button className='btn-table' onClick={() => abrirComprovante(sale.id)}>
                                    <img src={comprovanteIcon} alt="Icone de garar comprovante" />
                                </button>
                            </td>
                            </tr>
                        )
                    )
                }
                    
                
            </tbody>
        </table>

        
            
        </div>
    );
}

export default TableSales;

