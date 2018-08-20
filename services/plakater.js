const db = require('../config/database').connect();

const Produkt = () => { };

//READ - VISER ALLE PRODUKTER (BRUGES PÅ SIDEN ADMIN/PRODUKTERGETALL)
Produkt.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
        plakat.id AS id,
        plakat.navn AS navn,
        plakat.url AS url,
        kategori.navn AS kategori_navn
        FROM plakat
        INNER JOIN kategori ON plakat.fk_kategori = kategori.id
        `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
//READ - VISER ET PRODUKT (BRUGES PÅ SIDEN ADMIN/PRODUKTERUPDATEONE)
Produkt.getOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT
                plakat.id AS id,
                plakat.navn AS navn,
                plakat.url AS url,
                plakat.fk_kategori AS kategori_id,
                kategori.navn AS kategori_navn
            FROM plakat
            INNER JOIN kategori ON plakat.fk_kategori = kategori.id
            WHERE plakat.id = ${id}
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
// HENTER NAVNET FRA DB OG SAMMENLIGNER MED DET INDTASTET PRODUKTNAVN I FORMULAREN OM DE ER ENS
Produkt.getAntal = (produktnavn) => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT COUNT(plakat.navn) AS antal
            FROM plakat
            WHERE plakat.navn = '${produktnavn}'
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
// HENTER ALLE PLAKATER FRA DB OG TÆLLER HVOR MANGE DER ER
Produkt.getProduktAntal = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT COUNT(plakat.id) AS antal
            FROM plakat
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
//READ - VISER ALLE FREMSØGTE PRODUKTER (BRUGES PÅ SIDEN FIND)
Produkt.getFindResultat = (find_tekst) => {
    return new Promise((resolve, reject) => {

        // ::TODO - FÅ PLAKATER VIST I SØGERESULTATET
        // var find_tekst = req.params.find_tekst;

        var sql = `
                SELECT
                    plakat.id AS id,
                    plakat.navn AS navn,
                    plakat.url AS url,
                    kategori.navn AS kategori_navn
                FROM plakat
                INNER JOIN kategori ON plakat.fk_kategori = kategori.id
                WHERE plakat.navn LIKE '%${find_tekst}%' ORDER BY plakat.navn ASC
                `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
// CREATE - OPRETTER ET PRODUKT OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/PRODUKTERCREATEONE)
Produkt.createOne = (produktnavn, kategoriId, produktbillede) => {
    // console.log(kategoriId);
    return new Promise(async (resolve, reject) => {
        var sql = `
                INSERT INTO plakat
                SET
                    plakat.navn = ?, 
                    plakat.fk_kategori = ?, 
                    plakat.url = ?
            `;
        db.execute(sql, [ produktnavn, kategoriId, produktbillede ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};
// UPDATE - RETTER ET PRODUKT OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/PRODUKTERUPDATEONE)
Produkt.updateOne = (id, produktnavn, kategoriId, produktbillede) => {
    return new Promise(async (resolve, reject) => {

        var prepareStatement = [ produktnavn, kategoriId, produktbillede, id ];
        var sql = `
                UPDATE plakat
                SET
                    plakat.navn = ?, 
                    plakat.fk_kategori = ?, 
                    plakat.url = ?
                WHERE id = ?
            `;
        if (produktbillede == "") {
            prepareStatement = [ produktnavn, kategoriId, id ];
            sql = `
                UPDATE plakat
                SET
                    plakat.navn = ?, 
                    plakat.fk_kategori = ?
                WHERE id = ?
            `;

        }
        console.log(sql);
        db.execute(sql, prepareStatement, (err, result) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(result);
        });
    });
};
//DELETE
Produkt.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        var sql = `
                DELETE FROM plakat WHERE id = ${id}
            `;
        db.execute(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = Produkt;