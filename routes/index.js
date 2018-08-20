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
      // ::INFO - TJEK FORBINDELSE TIL DATABASE
      // Inden produkterne hentes ind på siden, tjekkes om data hentes ind fra db
      //  Udkommenter din res.render (hvis sådan en findes)
      // Kør i stedet en console.log og en res.send
      // Når siden er besøgt, vil man i terminalen kunne se udtrækket
      // console.log(produkterAlle);
      // res.send();
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}