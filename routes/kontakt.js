var kontakt = require('../services/kontakt');

module.exports = (app) => {
  app.get('/kontakt', async function (req, res) {
    // console.log(req.session);
    try {
      res.render('pages/kontakt', {
        siteTitle: 'KP',
        pageTitle: 'Kontakt'
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
  app.post('/kontakt', async (req, res) => {
    try {
      await kontakt.createOne(req.body.fornavn, req.body.efternavn, req.body.telefon, req.body.mail, req.body.emne, req.body.besked);
      res.redirect('/kontakt');
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}