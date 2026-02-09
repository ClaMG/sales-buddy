//Conferir formato do email
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

//Confere valida e aplica a mascara do cnpj
export const validateCNPJ = (cnpj) => {
    const cnpjLimpo = cnpj.replace(/\D/g, ''); 
    return cnpjLimpo.length === 14;
};

//Formata o cnpj
export const formatCNPJ = (cnpj) => {
    const limpo = cnpj.replace(/\D/g, ''); // Garante que só existam números
    return limpo
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};

//Validar o CPF 
export function validateCPF(cpf) {
    //Valida o formato 
    const regexFormato = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!regexFormato.test(cpf)) return false;

    //Remove a máscara
    const limpo = String(cpf).replace(/\D/g, ''); 
    
    //Valida tamanho e números repetidos
    if (limpo.length !== 11 || /^(\d)\1{10}$/.test(limpo)) return false;

    //Validação do primeiro dígito verificador
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(limpo.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(limpo.substring(9, 10))) return false;

    //Validação do segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(limpo.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(limpo.substring(10, 11))) return false;

    return true;
}