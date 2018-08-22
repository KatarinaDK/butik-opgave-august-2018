var kontakt = require('../services/kontakt');

module.exports = (app) => {
  app.get('/kontakt', async function (req, res) {
    // console.log(req.session);
    try {
      res.render('pages/kontakt', {
        siteTitle: 'KP',
        pageTitle: 'Kontakt',
        fornavn: "",
        efternavn: "",
        telefon: "",
        mail: "",
        emne: "",
        besked: "",
        validerMedDetSamme: 'false',
        formBesked: ""
      });
    } catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
  app.post('/kontakt', async (req, res) => {
    try {
      // console.log(req.body);

      

      // Henter felternes value og lægger ned i en variabel
      let fornavn = req.body.fornavn;
      let efternavn = req.body.efternavn;
      let telefon = req.body.telefon;
      let mail = req.body.mail;
      let emne = req.body.emne;
      let besked = req.body.besked;

      // Sætter som default status til true
      let status = true;

      // Tjekker de forskellige inputfelter - hvis de er tomme sættes status til false
      if (fornavn == "") status = false;
      if (efternavn == "") status = false;
      if (telefon == "") status = false;
      if (mail == "") status = false;
      if (emne == "") status = false;
      if (besked == "") status = false;

      // Hvis felterne ikke er tomme indsættes data i db og siden renderes på ny
      if (status == true) {
        await kontakt.createOne(fornavn, efternavn, telefon, mail, emne, besked);
        res.render('pages/kontakt', {
          siteTitle: 'KP',
          pageTitle: 'Kontakt',
          fornavn: "",
          efternavn: "",
          telefon: "",
          mail: "",
          emne: "",
          besked: "",
          validerMedDetSamme: 'false',
          formBesked: "Tak for din henvendelse"
        });
      } else {
        console.log("Formulardata ikke ok!");

        res.render('pages/kontakt', {
          siteTitle: 'KP',
          pageTitle: 'Kontakt',
          fornavn: fornavn,
          efternavn: efternavn,
          telefon: telefon,
          mail: mail,
          emne: emne,
          besked: besked,
          validerMedDetSamme: 'true',
          formBesked: ''

        });
      }
    }
    catch (e) {
      res.send(`'Der skete en fejl: '${e.name}`);
      console.log(e.name);
    }
  });
}