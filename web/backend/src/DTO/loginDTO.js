export function userResponseDTO(user) {
    return {
    usuario: user.usuario,
    nome: user.nome,
    empresa: user.empresa,
    cnpj: user.cnpj,
    email: user.email
    };
}