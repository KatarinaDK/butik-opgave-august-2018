const db = require('../config/database').connect();

const Produkt = () => { };

//READ - VISER ALLE PRODUKTER (BRUGES PÅ SIDEN ADMIN/PRODUKTERGETALL)
Produkt.getAll = () => {
    return new Promise((resolve, reject) => {
        var sql = `
        SELECT
        produkt.id AS id,
        produkt.navn AS navn,
        produkt.beskrivelse AS beskrivelse,
        produkt.pris AS pris,
        produkt.billede AS billede,
        kategori.navn AS kategori_navn,
        brand.navn AS brand_navn
        FROM produkt
        INNER JOIN kategori ON produkt.fk_kategori = kategori.id
        INNER JOIN brand ON produkt.fk_brand = brand.id
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
                produkt.id AS id,
                produkt.navn AS navn,
                produkt.url AS url,
                produkt.fk_kategori AS kategori_id,
                kategori.navn AS kategori_navn
            FROM produkt
            INNER JOIN kategori ON produkt.fk_kategori = kategori.id
            WHERE produkt.id = ${id}
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
            SELECT COUNT(produkt.navn) AS antal
            FROM produkt
            WHERE produkt.navn = '${produktnavn}'
            `;
        db.query(sql, (err, result) => {
            if (err) reject(err)
            resolve(result);
        });
    });
};
// HENTER ALLE produktER FRA DB OG TÆLLER HVOR MANGE DER ER
Produkt.getProduktAntal = () => {
    return new Promise((resolve, reject) => {
        var sql = `
            SELECT COUNT(produkt.id) AS antal
            FROM produkt
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

        // ::TODO - FÅ produktER VIST I SØGERESULTATET
        // var find_tekst = req.params.find_tekst;

        var sql = `
                SELECT
                    produkt.id AS id,
                    produkt.navn AS navn,
                    produkt.url AS url,
                    kategori.navn AS kategori_navn
                FROM produkt
                INNER JOIN kategori ON produkt.fk_kategori = kategori.id
                WHERE produkt.navn LIKE '%${find_tekst}%' ORDER BY produkt.navn ASC
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
                INSERT INTO produkt
                SET
                    produkt.navn = ?, 
                    produkt.fk_kategori = ?, 
                    produkt.url = ?
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
                UPDATE produkt
                SET
                    produkt.navn = ?, 
                    produkt.fk_kategori = ?, 
                    produkt.url = ?
                WHERE id = ?
            `;
        if (produktbillede == "") {
            prepareStatement = [ produktnavn, kategoriId, id ];
            sql = `
                UPDATE produkt
                SET
                    produkt.navn = ?, 
                    produkt.fk_kategori = ?
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
                DELETE FROM produkt WHERE id = ${id}
            `;
        db.execute(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = Produkt;