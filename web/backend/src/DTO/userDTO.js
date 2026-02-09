import e from "express";
import { validarCNPJ, formatarCNPJ, validarEmail } from "../utils/validateUtils.js";

export function userInsertDTO(user) {
    const formatoCnpj = validarCNPJ(user.cnpj);

    if (!formatoCnpj) {
        throw new Error("o cnpj precisa dos 14 números");
    }

    const cnpjFormatado = formatarCNPJ(user.cnpj)

    const fomatoEmail = validarEmail(user.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }

    return {
    usuario: user.usuario,
    nome: user.nome,
    empresa: user.empresa,
    cnpj: cnpjFormatado,
    email: user.email
    };
}

export function userLoginDTO(user) {
    return {
        usuario: user.usuario,
        senha: user.senha
    };

}

export function userDeletDTO(user) {
    return {
        ids: Array.isArray(user.ids) ? user.ids : [],
        idUser: user.idUser
    };
}

export function userUpdateDTO( user) {
    const formatoCnpj = validarCNPJ(user.cnpj);

    if (!formatoCnpj) {
        throw new Error("o cnpj precisa dos 14 números");
    }

    const cnpjFormatado = formatarCNPJ(user.cnpj)

    const fomatoEmail = validarEmail(user.email)

    if(!fomatoEmail){
        throw new Error("Email com o fomato errado, deve conter o @ e .com")
    }
    return {
        usuario: user.usuario,
        nome: user.nome,
        empresa: user.empresa,
        cnpj: cnpjFormatado,
        email: user.email
    };
}

export function userUpSenhaDTO(user){
    return {
        id: user.id
    };
}
export function userInsertCodetempDTO(user){
    return {
        usuario: user.usuario
    };
}

export function userUpCodeSenhaDTO(user) {
    return {
        usuario: user.usuario,
        code: user.code,
        senha: user.senha,
        repetirSenha: user.repetirSenha
    };
}