var plakater = require('../services/plakater');

module.exports = (app) => {
  app.get('/produkt/:id', async (req, res, next) => {
    // console.log(req.session);
    try {
      const produktet = await plakater.getOne(req.params.id);

      res.render('pages/produkt', {
        siteTitle: 'KP',
        pageTitle: 'Produktside',
        produkt: produktet
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}