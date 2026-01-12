import React from 'react';
import '../assets/css/global.css'
import './css/tables.css'
import './css/tableSales.css'
import comprovanteIcon from '../assets/icons-btn/receipt.svg'


function TableSales() {
    const salesData = [ { id: 1, nome: "Ana Silva", cpf: "123.456.789-01", email: "ana.silva@email.com", quantidade: 2, valor: "R$ 150,00", troco: "R$ 0,00" },
  { id: 2, nome: "Bruno Oliveira", cpf: "234.567.890-12", email: "bruno.o@email.com", quantidade: 1, valor: "R$ 80,00", troco: "R$ 20,00" },
  { id: 3, nome: "Carla Souza", cpf: "345.678.901-23", email: "carla.souza@email.com", quantidade: 5, valor: "R$ 450,00", troco: "R$ 50,00" },
  { id: 4, nome: "Diego Santos", cpf: "456.789.012-34", email: "diego.s@email.com", quantidade: 3, valor: "R$ 210,00", troco: "R$ 0,00" },
  { id: 5, nome: "Elena Pereira", cpf: "567.890.123-45", email: "elena.p@email.com", quantidade: 1, valor: "R$ 45,00", troco: "R$ 5,00" },
  { id: 6, nome: "Fabio Lima", cpf: "678.901.234-56", email: "fabio.lima@email.com", quantidade: 10, valor: "R$ 1.200,00", troco: "R$ 0,00" },
  { id: 7, nome: "Gisele Costa", cpf: "789.012.345-67", email: "gisele.c@email.com", quantidade: 2, valor: "R$ 190,00", troco: "R$ 10,00" },
  { id: 8, nome: "Hugo Rocha", cpf: "890.123.456-78", email: "hugo.rocha@email.com", quantidade: 4, valor: "R$ 320,00", troco: "R$ 0,00" },
  { id: 9, nome: "Isabela Martins", cpf: "901.234.567-89", email: "isabela.m@email.com", quantidade: 1, valor: "R$ 60,00", troco: "R$ 40,00" },
  { id: 10, nome: "João Pedro", cpf: "012.345.678-90", email: "joao.p@email.com", quantidade: 2, valor: "R$ 100,00", troco: "R$ 0,00" },
  { id: 11, nome: "Karen Alves", cpf: "112.233.445-56", email: "karen.a@email.com", quantidade: 3, valor: "R$ 270,00", troco: "R$ 30,00" },
  { id: 12, nome: "Lucas Ferreira", cpf: "223.344.556-67", email: "lucas.f@email.com", quantidade: 1, valor: "R$ 15,00", troco: "R$ 0,00" },
  { id: 13, nome: "Mariana Gomes", cpf: "334.455.667-78", email: "mari.gomes@email.com", quantidade: 6, valor: "R$ 540,00", troco: "R$ 60,00" },
  { id: 14, nome: "Natan Ribeiro", cpf: "445.566.778-89", email: "natan.r@email.com", quantidade: 2, valor: "R$ 180,00", troco: "R$ 0,00" },
  { id: 15, nome: "Olivia Castro", cpf: "556.677.889-90", email: "olivia.c@email.com", quantidade: 1, valor: "R$ 95,00", troco: "R$ 5,00" },
  { id: 16, nome: "Paulo Mendes", cpf: "667.788.890-01", email: "paulo.m@email.com", quantidade: 4, valor: "R$ 400,00", troco: "R$ 0,00" },
  { id: 17, nome: "Quenia Lopes", cpf: "778.899.901-12", email: "quenia.l@email.com", quantidade: 2, valor: "R$ 130,00", troco: "R$ 20,00" },
  { id: 18, nome: "Rafael Vaz", cpf: "889.900.012-23", email: "rafa.vaz@email.com", quantidade: 3, valor: "R$ 330,00", troco: "R$ 0,00" },
  { id: 19, nome: "Sabrina Moraes", cpf: "990.011.123-34", email: "sabrina.m@email.com", quantidade: 1, valor: "R$ 55,00", troco: "R$ 5,00" },
  { id: 20, nome: "Thiago Braga", cpf: "001.122.234-45", email: "thiago.b@email.com", quantidade: 5, valor: "R$ 500,00", troco: "R$ 0,00" },
  { id: 21, nome: "Ursula Duarte", cpf: "111.222.333-44", email: "ursula.d@email.com", quantidade: 2, valor: "R$ 140,00", troco: "R$ 10,00" },
  { id: 22, nome: "Victor Hugo", cpf: "222.333.444-55", email: "victor.h@email.com", quantidade: 1, valor: "R$ 25,00", troco: "R$ 0,00" },
  { id: 23, nome: "Wagner Luiz", cpf: "333.444.555-66", email: "wagner.l@email.com", quantidade: 8, valor: "R$ 800,00", troco: "R$ 0,00" },
  { id: 24, nome: "Xavier Neto", cpf: "444.555.666-77", email: "xavier.n@email.com", quantidade: 1, valor: "R$ 120,00", troco: "R$ 30,00" },
  { id: 25, nome: "Yara Lima", cpf: "555.666.777-88", email: "yara.l@email.com", quantidade: 3, valor: "R$ 270,00", troco: "R$ 0,00" },
  { id: 26, nome: "Zeca Pagodinho", cpf: "666.777.888-99", email: "zeca@email.com", quantidade: 2, valor: "R$ 160,00", troco: "R$ 40,00" },
  { id: 27, nome: "Alice No Pais", cpf: "777.888.999-00", email: "alice@email.com", quantidade: 1, valor: "R$ 30,00", troco: "R$ 0,00" },
  { id: 28, nome: "Beto Carrero", cpf: "888.999.000-11", email: "beto@email.com", quantidade: 12, valor: "R$ 2.400,00", troco: "R$ 100,00" },
  { id: 29, nome: "Caio Castro", cpf: "999.000.111-22", email: "caio@email.com", quantidade: 4, valor: "R$ 360,00", troco: "R$ 0,00" },
  { id: 30, nome: "Dora Aventureira", cpf: "000.111.222-33", email: "dora@email.com", quantidade: 1, valor: "R$ 50,00", troco: "R$ 10,00" }
]
    return (
        <table className='table-sales'>
            <thead>
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
            <tbody>
                
                {
                    salesData.map((sale) => (
                        <tr key={sale.id}>
                            <td className='sales-field sales-center'>{sale.id}</td>
                            <td className='sales-field'>{sale.nome}</td>
                            <td>{sale.cpf}</td>
                            <td>{sale.email}</td>
                            <td className='sales-center'>{sale.quantidade}</td>
                            <td className='sales-center'>{sale.valor}</td>
                            <td className='sales-center'>{sale.troco}</td>
                            <td className='sales-center'>
                                <button className='btn-table'>
                                    <img src={comprovanteIcon} alt="Icone de garar comprovante" />
                                </button>
                            </td>
                            </tr>
                        )
                    )
                }
                    
                
            </tbody>
        </table>
    );
}

export default TableSales;