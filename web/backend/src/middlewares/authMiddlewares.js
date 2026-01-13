import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    //Puxa o token
    const authHeader = req.headers['authorization'];
    //Pega apenas o token
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    try {
        //Valida o token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(403).json({ message: "Token inválido ou expirado." });
    }
}
