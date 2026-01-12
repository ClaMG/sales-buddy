import React from 'react';
import '../assets/css/global.css'
import editIcon from '../assets/icons-btn/edit.png'
import './css/tables.css'
import './css/tableUser.css'
import { useNavigate } from 'react-router-dom';


function TableUser() {
         const navigate = useNavigate();

    async function update() {
        navigate('/update')
    }
    const usersData = [ { id: 1, usuario: "ana.silva", nome: "Ana Beatriz Silva", empresa: "Tech Solutions Ltda", cnpj: "12.345.678/0001-90" },
        { id: 2, usuario: "carlos.m", nome: "Carlos Mendes", empresa: "Mendes Construções", cnpj: "98.765.432/0001-15" },
        { id: 3, usuario: "f.oliveira", nome: "Fernanda Oliveira", empresa: "Oliveira Alimentos", cnpj: "45.123.789/0001-22" },
        { id: 4, usuario: "roberto.j", nome: "Roberto Junior", empresa: "RJ Logística", cnpj: "33.444.555/0001-67" },
        { id: 5, usuario: "lucas.souza", nome: "Lucas Souza", empresa: "Souza & Filhos", cnpj: "11.222.333/0001-88" },
        { id: 6, usuario: "mariana.c", nome: "Mariana Costa", empresa: "Costa Marketing", cnpj: "77.888.999/0001-00" },
        { id: 7, usuario: "paulo.h", nome: "Paulo Henrique", empresa: "PH Consultoria", cnpj: "55.666.777/0001-34" },
        { id: 8, usuario: "julia.p", nome: "Júlia Pereira", empresa: "Pereira Design", cnpj: "99.000.111/0001-55" },
        { id: 9, usuario: "ricardo.a", nome: "Ricardo Almeida", empresa: "Almeida Tech", cnpj: "22.333.444/0001-11" },
        { id: 10, usuario: "beatriz.l", nome: "Beatriz Lima", empresa: "Lima Advocacia", cnpj: "66.777.888/0001-99" },
        { id: 11, usuario: "bruno.dias", nome: "Bruno Dias", empresa: "Dias Transportes", cnpj: "10.111.222/0001-33" },
        { id: 12, usuario: "camila.r", nome: "Camila Rocha", empresa: "Rocha & Associados", cnpj: "13.141.516/0001-77" },
        { id: 13, usuario: "diego.ferreira", nome: "Diego Ferreira", empresa: "Ferreira Imports", cnpj: "17.181.920/0001-88" },
        { id: 14, usuario: "eliana.m", nome: "Eliana Martins", empresa: "Martins Eventos", cnpj: "21.222.324/0001-99" },
        { id: 15, usuario: "gabriel.s", nome: "Gabriel Santos", empresa: "Santos Autopeças", cnpj: "25.262.728/0001-00" },
        { id: 16, usuario: "heloisa.n", nome: "Heloísa Nunes", empresa: "Nunes Cosméticos", cnpj: "29.303.132/0001-11" },
        { id: 17, usuario: "igor.t", nome: "Igor Teixeira", empresa: "Teixeira Engenharia", cnpj: "33.343.536/0001-22" },
        { id: 18, usuario: "jessica.b", nome: "Jéssica Barbosa", empresa: "Barbosa Modas", cnpj: "37.383.940/0001-33" },
        { id: 19, usuario: "kleber.v", nome: "Kleber Vieira", empresa: "Vieira Segurança", cnpj: "41.424.344/0001-44" },
        { id: 20, usuario: "larissa.g", nome: "Larissa Gomes", empresa: "Gomes Doceria", cnpj: "45.464.748/0001-55" },
        { id: 21, usuario: "matheus.l", nome: "Matheus Lopes", empresa: "Lopes Imóveis", cnpj: "49.505.152/0001-66" },
        { id: 22, usuario: "natalia.r", nome: "Natália Ribeiro", empresa: "Ribeiro Turismo", cnpj: "53.545.556/0001-77" },
        { id: 23, usuario: "otavio.m", nome: "Otávio Moreira", empresa: "Moreira Seguros", cnpj: "57.585.960/0001-88" },
        { id: 24, usuario: "patricia.c", nome: "Patrícia Carvalho", empresa: "Carvalho Clínica", cnpj: "61.626.364/0001-99" },
        { id: 25, usuario: "renan.b", nome: "Renan Batista", empresa: "Batista Software", cnpj: "65.666.768/0001-00" },
        { id: 26, usuario: "sabrina.k", nome: "Sabrina Klein", empresa: "Klein Arquitetura", cnpj: "69.707.172/0001-11" },
        { id: 27, usuario: "thiago.a", nome: "Thiago Alves", empresa: "Alves & Cia", cnpj: "73.747.576/0001-22" },
        { id: 28, usuario: "ursula.p", nome: "Ursula Pinto", empresa: "Pinto Paisagismo", cnpj: "77.787.980/0001-33" },
        { id: 29, usuario: "vinicius.d", nome: "Vinícius Duarte", empresa: "Duarte Motors", cnpj: "81.828.384/0001-44" },
        { id: 30, usuario: "wilson.f", nome: "Wilson Fagundes", empresa: "Fagundes Ferragens", cnpj: "85.868.788/0001-55" },
        { id: 31, usuario: "xuxa.m", nome: "Xuxa Meneghel", empresa: "Rainha dos Baixinhos S.A", cnpj: "89.909.192/0001-66" },
        { id: 32, usuario: "yasmin.z", nome: "Yasmin Zanetti", empresa: "Zanetti Joias", cnpj: "93.949.596/0001-77" },
        { id: 33, usuario: "ze.carlos", nome: "Zé Carlos", empresa: "Zé Lanches", cnpj: "97.989.900/0001-88" },
        { id: 34, usuario: "alice.w", nome: "Alice Wonderland", empresa: "Wonderland Corp", cnpj: "01.020.304/0001-99" },
        { id: 35, usuario: "breno.k", nome: "Breno Kuster", empresa: "Kuster Investimentos", cnpj: "05.060.708/0001-00" },
        { id: 36, usuario: "celia.t", nome: "Célia Torres", empresa: "Torres Editora", cnpj: "09.101.112/0001-11" },
        { id: 37, usuario: "daniel.x", nome: "Daniel Xavier", empresa: "Xavier Games", cnpj: "13.141.516/0001-22" },
        { id: 38, usuario: "eliza.s", nome: "Eliza Samudio", empresa: "Samudio Varejo", cnpj: "17.181.920/0001-33" },
        { id: 39, usuario: "fabio.jr", nome: "Fábio Junior", empresa: "FJ Músicas", cnpj: "21.222.324/0001-44" },
        { id: 40, usuario: "giovana.l", nome: "Giovana Lins", empresa: "Lins Petshop", cnpj: "25.262.728/0001-55" },
        { id: 41, usuario: "hugo.v", nome: "Hugo Viana", empresa: "Viana Contabilidade", cnpj: "29.303.132/0001-66" },
        { id: 42, usuario: "isabela.f", nome: "Isabela Freitas", empresa: "Freitas RH", cnpj: "33.343.536/0001-77" },
        { id: 43, usuario: "joao.pedro", nome: "João Pedro", empresa: "JP Automação", cnpj: "37.383.940/0001-88" },
        { id: 44, usuario: "karina.b", nome: "Karina Bastos", empresa: "Bastos Odonto", cnpj: "41.424.344/0001-99" },
        { id: 45, usuario: "leandro.m", nome: "Leandro Macedo", empresa: "Macedo Fitness", cnpj: "45.464.748/0001-00" },
        { id: 46, usuario: "monica.g", nome: "Mônica Geller", empresa: "Geller Chef", cnpj: "49.505.152/0001-11" },
        { id: 47, usuario: "nelson.m", nome: "Nelson Mandela", empresa: "Freedom Foundation", cnpj: "53.545.556/0001-22" },
        { id: 48, usuario: "olivia.p", nome: "Olívia Palito", empresa: "Popeye Solutions", cnpj: "57.585.960/0001-33" },
        { id: 49, usuario: "pedro.alvares", nome: "Pedro Álvares", empresa: "Descobrimento Ltda", cnpj: "61.626.364/0001-44" },
        { id: 50, usuario: "quiteria.s", nome: "Quitéria Silva", empresa: "Silva Artesanato", cnpj: "65.666.768/0001-55" }
]
    return (
        <table className='table-user'>
            <thead>
                <tr>
                    <th className='user-close'></th>
                    <th>USUÁRIO</th>
                    <th>NOME</th>
                    <th>EMPRESA</th>
                    <th>CNPJ</th>
                    <th className='user-left'></th>
                </tr>
            </thead>
            <tbody>
                    {usersData.map(user => (
                        <tr key={user.id}>
                            <td className='user-close'>
                                <label htmlFor={user.id}>
                                <input type="checkbox" name="user" id={user.id} />
                                </label>
                            </td>
                            <td className='user-field'>{user.usuario}</td>
                            <td>{user.nome}</td>
                            <td>{user.empresa}</td>
                            <td>{user.cnpj}</td>
                            <td>
                                <button className='btn-table' onClick={update()}>
                                    <img src={editIcon} alt="icone para editar usuario" />
                                </button>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default TableUser;