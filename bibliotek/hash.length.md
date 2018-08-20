# Hvor mange tegn indeholder et Hash?

Tjek hvor mange tegn password indeholder efter det er hashed, da det har indflydelse på db feltet (reserveret plads).
Salt tilføjer noget ekstra til koden. f.eks. 1234 bliver til 1234Hejmeddig (det kan ikke ses og skal ikke tastes ind).

const Hash = function (password) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, res) => {
            if (err) reject(err);
            resolve(res);
        });
    });
};
// const hash = await Hash('1234');
// console.log(hash);