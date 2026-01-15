import bcrypt from 'bcryptjs';

// Transforma a senha 
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Compara a senha 
export const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

//Conferir formato do email
export const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

//Confere valida e aplica a mascara do cnpj
export const validarCNPJ = (cnpj) => {
    const cnpjLimpo = cnpj.replace(/\D/g, ''); 
    return cnpjLimpo.length === 14;
};

export const formatarCNPJ = (cnpj) => {
    const limpo = cnpj.replace(/\D/g, ''); // Garante que só existam números
    return limpo
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // Limita o tamanho
};

