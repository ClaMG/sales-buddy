import { openDb } from "../config/database";

export async function createUsers() {
    const db = await openDb();
    await db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        nome TEXT,
        empresa TEXT,
        cnpj TEXT,
        senha TEXT,
        email TEXT
    )`);
}