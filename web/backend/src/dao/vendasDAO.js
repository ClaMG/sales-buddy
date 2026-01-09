import { openDb } from "../config/database";    

export async function getVendas() {
    const db = await openDb();
    return await db.all("SELECT * FROM vendas");
}
