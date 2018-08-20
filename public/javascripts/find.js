// Når sidens elementer (alt indhold) er loadet på siden
(() => {
    document.addEventListener('DOMContentLoaded', () => {

        // Laver en reference til sogeknappen
        var btn_find = document.querySelector('#btn_find');

        // Gør at browseren lytter på om der er blevet trykket på knappen
        btn_find.addEventListener("click", function () {

         // Laver en reference til søgefeltet
            var input_find = document.querySelector('#input_find');

            // Inputfeltets value lægges i en variablel
            var find_tekst = input_find.value;
 
            // Sender brugeren til produkt_soeg.html med søgeteksten som url parameter
            window.location.href=`find/find_tekst=${find_tekst}`;
        });
    });
})();

// ::TODO - FIND UD AF HVORDAN OG HVOR PARAMETRENE SKAL SENDES MED OVER FRA URL´EN