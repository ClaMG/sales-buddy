import SalesDao from '../dao/salesDAO.js'

export async function findAllSale(res) {
    try {
        const resultado = await SalesDao.findAllSales();
        return res.status(201).json(resultado);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}