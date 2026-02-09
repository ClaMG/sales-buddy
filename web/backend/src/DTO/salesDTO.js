import { validateEmail, validateCPF} from '../utils/validateUtils.js'

export function saleProofDTO(venda) {
    return {
        id: venda.id
    };
}

export function saleCreateDTO(venda) {
    const fomatoEmail = validateEmail(venda.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    const cpfValido = validateCPF(venda.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }
    return {
        nomeCliente: venda.nomeCliente || venda.nome,
        cpf: venda.cpf,
        email: venda.email,
        valorRecebido: parseFloat(venda.valorRecebido) || 0,
        valorVenda: parseFloat(venda.valorVenda) || 0,
        troco: parseFloat(venda.troco) || 0,
        itens: venda.itens ? venda.itens.map(item => ({
            descricao: item.descricao 
        })) : []
    };
}
export function saleSendProofDTO(venda) {

    const fomatoEmail = validateEmail(venda.email);
    if (!fomatoEmail) {
        throw new Error("Email com o formato errado, deve conter o @ e .com");
    }

    const cpfValido = validateCPF(venda.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }

    return {
        nomeCliente: venda.nomeCliente || venda.nome,
        cpf: venda.cpf,
        email: venda.email,
        valorRecebido: parseFloat(venda.valorRecebido),
        valorVenda: parseFloat(venda.valorVenda),
        troco: parseFloat(venda.troco),
        itens: venda.itens ? venda.itens.map(item => ({
            descricao: item.descricao
        })) : []
    };
}
export function saleSendProofMobileDTO(venda) {
    const fomatoEmail = validateEmail(venda.email);
    if (!fomatoEmail) {
        throw new Error("Email com o formato errado, deve conter o @ e .com");
    }

    const cpfValido = validateCPF(venda.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }
    return {
        nomeCliente: venda.nomeCliente || venda.nome,
        cpf: venda.cpf,
        email: venda.email,
        valorRecebido: parseFloat(venda.valorRecebido) || 0,
        valorVenda: parseFloat(venda.valorVenda) || 0,
        troco: parseFloat(venda.troco) || 0,
        itens: venda.itens ? venda.itens.map(item => ({
            descricao: item.descricao
        })) : []
    };
}
export function saleCreateReprocessingDTO(venda) {
    const fomatoEmail = validateEmail(venda.email);
    if (!fomatoEmail) {
        throw new Error("Email com o formato errado, deve conter o @ e .com");
    }

    const cpfValido = validateCPF(venda.cpf);
    if (!cpfValido) {
        throw new Error("CPF inválido.");
    }
    return {
        nomeCliente: venda.nomeCliente || venda.nome,
        cpf: venda.cpf,
        email: venda.email,
        valorRecebido: parseFloat(venda.valorRecebido) || 0,
        valorVenda: parseFloat(venda.valorVenda) || 0,
        troco: parseFloat(venda.troco) || 0,
        itens: venda.itens ? venda.itens.map(item => ({
            descricao: item.descricao
        })) : []
    };
}

export function saleReprocessingByIdDTO(venda) {
    return {
        id: Array.isArray(venda.id) ? venda.id : []
    };
}