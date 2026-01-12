import '../../assets/css/global.css'
import './css/proof.css'

function Proof(){
    const usersData =[ { id: 1, nome: "Ana Silva", cpf: "123.456.789-01", 
        email: "ana.silva@email.com", quantidade: 2, valorR: "R$ 150,00", valorV: 'R$30,00', troco: "R$ 0,00", 
        item: [
      { id: 101, descricao: "Licença SalesBuddy" },
      { id: 102, descricao: "Suporte Premium" }
    ] }]

    return (
        <div className='container-body-proof'>
            <div className='container-beige-proof'>
            {
            usersData.map((user) => (
                       <div key={user.id} className='container-info-proof'>
                        <div>
                            <div className='container-primary-proof'>
                                <div>
                                    <p className='title-camp-proof'>Nome</p>
                                    <p className='connoteudo-camp-proof'>{user.nome}</p>
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
                                            <td className='connoteudo-camp-proof'>{user.item.id}</td>
                                            <td className='connoteudo-camp-proof'>{user.item.descricao}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div>
                                <div className='container-valor'>
                                    <p className='title-camp-proof-valor'>Valor recebido</p>
                                    <p className='title-camp-proof'>{user.valorR}</p>
                                </div>
                                <div className='container-valor'>
                                    <p className='title-camp-proof-valor'>Valor venda</p>
                                    <p className='title-camp-proof'>{user.valorV}</p>
                                </div>
                                <div className='container-valor'>
                                    <p className='title-camp-proof-valor'>Troco devido</p>
                                    <p className='title-camp-proof'>{user.valorR}</p>
                                </div>
                            </div>
                        </div>
                        <p className='sales-id-proof'>Venda nº{user.id}</p>
                       </div>
                )
            )
            }
            
            </div>
            <div className='group-btn-proof'>
                <button className='btn-blue-proof'>SALVAR</button>
                <button className='btn-blue-proof'>IMPRIMIR</button>
                <button className='btn-red-proof'>FECHAR</button>
            </div>
        </div>

    );
}
export default Proof