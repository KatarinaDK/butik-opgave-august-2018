// ::INFO - TJEK OM DER ER SAT EN SESSION

// Funktionen tjekker om der er sat en session.

// Eksempel hvor authenticate er indsat i et route: 
// app.get('/admin/produkter/getAll', authenticate, async (req, res) => {}

// Når betingelserne for authenticate retunerer true, vil routet fortsætte med at læse parametrene -og derved nå til (req, res).

// Hvis authenticate retunerer false, redirectes istedet til login-siden.

module.exports = function (req, res, next) {
    if (req.session && req.session.isLoggedIn) {
        return next();
    } 
    else {
        res.redirect('/login');
    }
    // return next(); 
    // Bruges hvis login driller - vil slå session og authenticate fra. Tænd denne og udkommenter linje 4-9
};