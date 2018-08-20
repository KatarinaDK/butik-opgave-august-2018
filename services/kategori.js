const db = require('../config/database').connect();

const Kategori = () => { };

Kategori.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                kategori.id AS kategori_id,
                kategori.navn AS kategori_navn
            FROM kategori
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)

            resolve(result);
        });
    });
};

module.exports = Kategori;
