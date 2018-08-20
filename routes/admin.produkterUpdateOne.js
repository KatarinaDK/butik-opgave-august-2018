var authenticate = require('../middleware/authenticate');
var kategorier = require('../services/kategori');
var plakater = require('../services/plakater');

module.exports = (app) => {
  app.get('/admin/produkter/updateOne/:id', authenticate, async (req, res) => {
    try {
      const produkter = await plakater.getOne(req.params.id);
      const produktKategori = await kategorier.getAll();

      res.render('admin/produkterUpdateOne', {
        siteTitle: 'KP',
        pageTitle: 'Produktredigering',
        produkt: produkter[0],
        kategorier: produktKategori,
        message: ''
      });
    } catch (e) {
      res.send(`'Der skete en fejl nnnnnnn: '${e.name}`);
      console.log(e.name);
    }
  });

  app.post('/admin/produkter/updateOne/:id', async (req, res) => {
    try {
      await plakater.updateOne(req.params.id, req.body.produktnavn, req.body.kategorinavn, req.body.produktbillede);
      res.redirect('/admin/produkter/getAll');
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}

// ::TODO - DER ER FEJL NÅR SIDEN SKAL INDLÆSES (DET ER MULIGVIS SKET EFTER JEG OMSKREV TIL => I SERVICES OG ROUTES?????)