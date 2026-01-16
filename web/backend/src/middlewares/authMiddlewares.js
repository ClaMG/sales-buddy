import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    // O split separa "Bearer" do "TOKEN_STRING"
    const token = authHeader && authHeader.split(' ')[1];

    // Logs estratégicos para identificar problemas de ambiente ou envio
    console.log("--- DEBUG AUTH ---");
    console.log("CHAVE SECRET NO MIDDLEWARE:", process.env.JWT_SECRET ? "DEFINIDA" : "UNDEFINED");
    console.log("TOKEN RECEBIDO:", token ? "SIM (Enviado pelo Front)" : "NÃO (Front não enviou)");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // Validação real do token com a chave do .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Salva os dados do usuário (id, nome, etc) na requisição para uso posterior
        req.user = decoded;
        
        console.log("USUÁRIO AUTENTICADO:", decoded.id || "Token Válido");
        next();
    } catch (error) {
        // Se cair aqui, o token existe mas não é válido ou expirou
        console.error("ERRO NA VALIDAÇÃO JWT:", error.message);
        
        const status = error.message === 'jwt expired' ? 401 : 403;
        return res.status(status).json({ 
            message: "Token inválido ou expirado.",
            error: error.message 
        });
    }
}
