import { openDb } from "../config/database";

export async function getUsers() {
    const db = await openDb();
    return await db.all("SELECT * FROM users");
}

export async function insetUsers(usuario, nome, empresa, cnpj, senha, email) {
    const db = await openDb();
    await db.run("INSERT INTO users (usuario, nome, empresa, cnpj, senha, email) VALUES (?, ?, ?, ?, ?, ?)", [usuario, nome, empresa, cnpj, senha, email]);
}

export async function deleteUser(id) {
    const db = await openDb();
    await db.run("DELETE FROM users WHERE id = ?", [id]);
}

export async function updateUser(id, usuario, nome, empresa, cnpj, senha, email) {
    const db = await openDb();
    await db.run("UPDATE users SET usuario = ?, nome = ?, empresa = ?, cnpj = ?, senha = ?, email = ? WHERE id = ?", [usuario, nome, empresa, cnpj, senha, email, id]);
}

