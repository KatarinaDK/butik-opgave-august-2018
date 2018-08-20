var produkt = require('../services/produkt');

module.exports = (app) => {
  app.get('/produkt/:id', async (req, res, next) => {
    // console.log(req.session);
    try {
      const tmpProduktet = await produkt.getOne(req.params.id);
      const produktet = tmpProduktet[ 0 ];

      console.log(produktet);
      res.render('pages/produkt', {
        siteTitle: 'KP',
        pageTitle: 'Produktside',
        produkt: produktet
      });

      // console.log(produkterAlle);
      // res.send();
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}