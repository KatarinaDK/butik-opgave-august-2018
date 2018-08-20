var produkt = require('../services/produkt');

module.exports = (app) => {
  app.get('/find/:id', async (req, res) => {
    console.log(req.session);

    try {
      const produktResultater = await produkt.getFindResultat(req.params.id);

      res.render('pages/find', {
        siteTitle: 'KP',
        pageTitle: 'Find Produkt',
        produkter: produktResultater
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}