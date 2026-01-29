export function saleResponseDTO(venda) {
    return {
        nomeCliente: venda.nome,
        cpf: venda.cpf,
        valorTotal: venda.valorVenda,
        dataVenda: venda.createdAt,
        itens: venda.itens ? venda.itens.map(item => ({
            id: item.id,
            produto: item.nome,
            preco: item.preco
        })) : []
    };
}