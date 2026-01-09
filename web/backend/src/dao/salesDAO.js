import { openDb } from "../config/database";    

export async function getSales() {
    const db = await openDb();
    return await db.all("SELECT * FROM vendas");
}
