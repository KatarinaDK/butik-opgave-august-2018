const db = require('../config/database').connect();

const Kontakt = () => { };

// CREATE - OPRETTER EN BESKED OG INDSÆTTER I DB (BRUGES PÅ SIDEN ADMIN/PRODUKTERCREATEONE)
Kontakt.createOne = (fornavn, efternavn, telefon, mail, emne, besked) => {
    // console.log(kategoriId);
    return new Promise(async (resolve, reject) => {
        var sql = `
                    INSERT INTO kontakt
                    SET
                        kontakt.fornavn = ?,
                        kontakt.efternavn = ?,
                        kontakt.telefon = ?,
                        kontakt.mail = ?,
                        kontakt.emne = ?,
                        kontakt.besked = ?
                `;
        db.execute(sql, [ fornavn, efternavn, telefon, mail, emne, besked ], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
};

module.exports = Kontakt;