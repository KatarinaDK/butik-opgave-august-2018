var authenticate = require('../middleware/authenticate');
var plakater = require('../services/plakater');

module.exports = (app) => {
  // RENDERING AF SIDEN
  app.get('/admin/produkter/getAll', authenticate, async (req, res) => {
    // console.log(req.session);
    try {
      const produkterAlle = await plakater.getAll();

      res.render('admin/produkterGetAll', {
        siteTitle: 'KP',
        pageTitle: 'Produktoversigt',
        produkter: produkterAlle
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  // SLET ET PRODUKT OG GENINDLÆS SIDEN
  app.get('/admin/produkter/delete/:id', async (req, res) => {
    const produktId = req.params.id;

    try {
      await plakater.deleteOne(produktId);
      res.redirect('/admin/produkter/getAll');
    }
    catch (e) {
      res.send('Der skete en fejl');
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    };
  });
}