import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        // Validação do token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Salva os dados do usuário 
        req.user = decoded;
        
        console.log("USUÁRIO AUTENTICADO:", decoded.id || "Token Válido");
        next();
    } catch (error) {
        //o token existe mas não é válido ou expirou
        console.error("ERRO NA VALIDAÇÃO JWT:", error.message);
        
        const status = error.message === 'jwt expired' ? 401 : 403;
        return res.status(status).json({ 
            message: "Token inválido ou expirado.",
            error: error.message 
        });
    }
}
