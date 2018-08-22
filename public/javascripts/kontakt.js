// ::INFO - VALIDERING AF KONTAKTFORMULAR PÅ SERVERSIDE
// Hjælper brugeren til at udfylde felterne korrekt
// Vil give fejlbeskeder og sætte makøren i det berørte inputfelt ved fejl

// ::BEMÆRK - AT VED VALIDERING AF FORMULARER TIL ADMIN (LOGIN, OPRET PRODUKT M.M.) ER DER I STEDET ANVENDT HTML5 VALIDERING, DA MEGET AF VALIDERINGEN FORETAGES SERVERSIDE OG ADMIN MÅSKE ER MERE BEVANDRET I FORMULARUDFYLDNING. SOM EN EKSTRA SERVICE KUNNE DET GØRES ALLIGEVEL...

function formularValidering(form) {
    "use strict";

    var status = true; // som udgangspunkt er alt i orden

    if (form.fornavn.value.length === 0) { // Hvis feltet ikke er udfyldt
        document.querySelector('#fornavnHelp').innerHTML = "Udfyld dit fornavn"; // Indsæt tekst i fornavnHelp
        if (status == true) form.fornavn.focus(); //sætter markøren i det valgte felt
        status = false; // Sørger for at der ikke submittes
    } else {
        document.querySelector('#fornavnHelp').innerHTML = ""; // Sørger for at feltet er/bliver ryddet, da der ingen fejl er
    }

    if (form.efternavn.value.length === 0) {
        document.querySelector('#efternavnHelp').innerHTML = "Udfyld dit efternavn";

        if (status == true) form.efternavn.focus();
        status = false;


    } else {
        document.querySelector('#efternavnHelp').innerHTML = "";
    }

    if (form.telefon.value.length === 0) {
        document.querySelector('#telefonHelp').innerHTML = "Udfyld dit telefon nummer";
        if (status == true) form.telefon.focus();
        status = false;
    }
    else if (isNaN(form.telefon.value)) { // Tjekker om værdien er number
        document.querySelector('#telefonHelp').innerHTML = "Dette er ikke et nummer - prøv igen";
        if (status == true) form.telefon.focus();
        status = false;
    }
    else if (form.telefon.value.length !== 8) { // tjekker om længden på værdien er 8
        document.querySelector('#telefonHelp').innerHTML = "Husk otte cifre";
        if (status == true) form.telefon.focus();
        status = false;
    } else {
        document.querySelector('#telefonHelp').innerHTML = "";
    }

    if (form.mail.value.length === 0) {
        document.querySelector('#emailHelp').innerHTML = "Udfyld din email adresse";
        if (status == true) form.mail.focus();
        status = false;
    } else {
        if (checkEmail(form.mail.value)) { // kalder på checkEmail og sender værdien med
            document.querySelector('#emailHelp').innerHTML = "Dette er ikke en mail adresse. Husk @ og .";
            if (status == true) form.mail.focus();
            status = false;
        } else {
            document.querySelector('#emailHelp').innerHTML = ""
        };
    }

    if (form.emne.value.length === 0) {
        document.querySelector('#emneHelp').innerHTML = "Udfyld emne feltet";
        if (status == true) form.emne.focus();
        status = false;
    } else {
        document.querySelector('#emneHelp').innerHTML = "";
    }

    if (form.besked.value.length === 0) {
        document.querySelector('#beskedHelp').innerHTML = "Udfyld besked feltet";
        if (status == true) form.besked.focus();
        status = false;
    } else {
        document.querySelector('#beskedHelp').innerHTML = "";
    }

    function checkEmail(mail) { // tjekker regex - KODE UDLEVERET I UNDERVISNINGEN
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // regex for en typisk mail
        if (filter.test(mail)) {
            return false;
        }
        return true;
    }
    return status;
}