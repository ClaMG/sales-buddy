import { openDb } from "../config/database";

export async function createSales() {
    const db = await openDb();
    await db.run(`CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        cpf TEXT,
        email TEXT,
        quantidade INTEGER,
        valor REAL,
        troco REAL
    )`);
}
