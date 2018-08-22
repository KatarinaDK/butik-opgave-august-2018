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
    // try {
    console.log(req.body);

    let fornavn = req.body.fornavn;
    let efternavn = req.body.efternavn;
    let telefon = req.body.telefon;
    let mail = req.body.mail;
    let emne = req.body.emne;
    let besked = req.body.besked;


    let status = true;

    if (fornavn == "") {

      status = false;
    }
    if (efternavn == "") {
      status = false;
    }
    if (telefon == "") {
      status = false;
    }
    if (mail == "") {
      status = false;
    }
    if (emne == "") {
      status = false;
    }
    if (besked == "") {
      status = false;
    }


    if (status == true) {
      await kontakt.createOne(req.body.fornavn, req.body.efternavn, req.body.telefon, req.body.mail, req.body.emne, req.body.besked);
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


    // } 
    // catch (e) {
    //   res.send(`'Der skete en fejl: '${e.name}`);
    //   console.log(e.name);
    // }
  });
}