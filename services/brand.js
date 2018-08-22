const db = require('../config/database').connect();

const Brand = () => { };

Brand.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
                SELECT
                    brand.id AS brand_id,
                    brand.navn AS brand_navn
                FROM brand
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)

            resolve(result);
        });
    });
};

module.exports = Brand;
