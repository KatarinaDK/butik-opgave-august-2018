// ::INFO - ROUTE RENDER ADMIN SIDEN

// Dette route har kun til formål at rendere admin siden.
// Kalder bl.a. funktionen authenticate - vil ikke kunne gå videre medmindre der retuneres true - funktionen vil derfor ikke blive udført

var authenticate = require('../middleware/authenticate');
var produkt = require('../services/produkt');

module.exports = (app) => {
  app.get('/admin', authenticate, async (req, res, next) => {
    // console.log(req.session);
    try {
      const produkter = await produkt.getProduktAntal();
      console.log(produkter);
      let antal = produkter[ 0 ].antal;
      console.log(antal);


      res.render('admin/index', {
        siteTitle: 'KP',
        pageTitle: 'Adminpanel',
        produktAntal: antal
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}