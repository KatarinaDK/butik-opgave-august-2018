var authenticate = require('../middleware/authenticate');
var kategorier = require('../services/kategori');
var plakater = require('../services/plakater');

module.exports = (app) => {
  app.get('/admin/produkter/createOne', authenticate, async (req, res) => {
    // console.log(req.session);
    try {
      const produktKategori = await kategorier.getAll();

      res.render('admin/produkterCreateOne', {
        siteTitle: 'KP',
        pageTitle: 'Produktoprettelse',
        kategorier: produktKategori,
        message: ""
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  app.post('/admin/produkter/createOne', async (req, res) => {
    try {
      const produkter = await plakater.getAntal(req.body.produktnavn);
      let antal = produkter[ 0 ].antal;

      // HVIS NAVNET ER UNIKT
      if (antal == 0) {
        await plakater.createOne(req.body.produktnavn, req.body.kategorinavn, req.body.produktbillede);
        res.redirect('/admin/produkter/getAll');
      }
      // HVIS NAVNET IKKE ER UNIKT
      else {
        // ::TODO - HER BURDE INDSÆTTES EN FETCH I STEDET, SÅ FELTERNE IKKE RYDDES
        const produktKategori = await kategorier.getAll();

        res.render('admin/produkterCreateOne', {
          siteTitle: 'KP',
          pageTitle: 'Produktoprettelse',
          kategorier: produktKategori,
          message: "Produktnavnet findes i forvejen!"
        });
      }
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}