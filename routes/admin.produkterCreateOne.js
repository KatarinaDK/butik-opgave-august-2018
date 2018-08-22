var authenticate = require('../middleware/authenticate');
var kategorier = require('../services/kategori');
var brands = require('../services/brand');
var produkt = require('../services/produkt');

module.exports = (app) => {
  app.get('/admin/produkter/createOne', authenticate, async (req, res) => {
    // console.log(req.session);
    try {
      const produktKategori = await kategorier.getAll();
      const produktBrand = await brands.getAll();

      res.render('admin/produkterCreateOne', {
        siteTitle: 'KP',
        pageTitle: 'Produktoprettelse',
        kategorier: produktKategori,
        brands: produktBrand,
        message: ""
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });

  app.post('/admin/produkter/createOne', async (req, res) => {
    try {
      const produkter = await produkt.getAntal(req.body.produktnavn);
      let antal = produkter[0].antal;

      // HVIS NAVNET ER UNIKT
      if (antal == 0) {
        await produkt.createOne(req.body.produktnavn, req.body.produktbeskrivelse, req.body.produktpris, req.body.produktbillede, req.body.kategoriId, req.body.brandId);
        res.redirect('/admin/produkter/createOne');
      }
      // HVIS NAVNET IKKE ER UNIKT
      else {
        // ::TODO - HER BURDE INDSÆTTES EN FETCH I STEDET, SÅ FELTERNE IKKE RYDDES
        const produktKategori = await kategorier.getAll();
        const produktBrand = await brands.getAll();

        res.render('admin/produkterCreateOne', {
          siteTitle: 'KP',
          pageTitle: 'Produktoprettelse',
          kategorier: produktKategori,
          brands: produktBrand,
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