import crypto from 'crypto';


//Gera senha aleatoria
export const gerarSenhaAleatoria = (tamanho) => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    // No Node, usamos crypto.randomBytes
    return Array.from({ length: tamanho }, () => {
        const randomIndex = crypto.randomInt(0, caracteres.length);
        return caracteres[randomIndex];
    }).join('');
};