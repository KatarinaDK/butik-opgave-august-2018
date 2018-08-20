const db = require('../config/database').connect();
const Hash = require('./hash');

const User = () => {};

//CREATE - opretter en user
User.createOne = (username, password) => {
    return new Promise(async (resolve, reject) => {
        const hash = await Hash.createOne(password);
        db.execute('INSERT INTO users SET username = ?, password = ?', [username, hash], (err, result) => {
            if (err) reject(err);
            console.log(result);
            resolve(true);
        });
    });
};
 
//READ - henter/viser en bruger
User.getOne = (id) => {
    return new Promise((resolve, reject) => {
        db.execute('SELECT username FROM users WHERE id = ?', [id], (error, result) => {
            if (error) reject(error);
            resolve(result[0].username);
        });
    });
};

//UPDATE - Opdaterer password 
User.update = (id, password) => {
    return new Promise(async (resolve, reject) => {
        const hash = await Hash.createOne(password);
        db.execute('UPDATE users SET password = ? WHERE id = ?', [hash, id], (error) => {
            if (error) reject(error);
            resolve();
        });
    });
};

//DELETE - Sletter en bruger
User.deleteOne = (id) => {
    return new Promise((resolve, reject) => {
        db.execute('DELETE FROM users WHERE id = ?', [id], (error, result) => {
            if (error) reject(error);
            resolve();
        });
    });
};

//tjekker om brugernavn og adgangskode er korrekt
User.validate = (username, password) => {
    return new Promise((resolve, reject) => {
        db.execute('SELECT id, password FROM users WHERE username = ?', [username], async (err, result) => {
            
            if (err) resolve({ status: false, besked: "Teknisk MySQL fejl", fejl: err });
            
            if (result[0] === undefined) {
                resolve({ status: false, besked: "Brugeren ikke fundet" });
            }
            else {
                if (await Hash.compare(password, result[0].password)) {
                    resolve({ status: true, besked: "",  userId: result[0].id });
                } else {
                    // reject('invalid password');
                    resolve({ status: false, besked: "Forkert kodeord" });
                }
            }
        });
    });
};

module.exports = User;