var plakater = require('../services/plakater');

module.exports = (app) => {
  app.get('/', async (req, res, next) => {
    // console.log(req.session);
    try {
      const produkterAlle = await plakater.getAll();

      res.render('pages/index', {
        siteTitle: 'KP',
        pageTitle: 'Forside',
        produkter: produkterAlle
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}