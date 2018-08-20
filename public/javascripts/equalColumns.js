// ::INFO - ANGIV SAMME HØJDE PÅ ELEMENTER
// Denne funktion sørger for at alle elementer med classname="equalColumns" vil få samme højde.

var equalColumns = (classname) => {
    var columns = document.getElementsByClassName(classname); // Finder alle elementer der har classen "sammeHojde"

    var length = columns.length; // Angiver hvor mange elementer der har classen sammeHojde
    var height = 0; // Sætter som udgangspunkt højden af elementet til 0

    for (var i = 0; i < length; i++) {
        columns[i].style.height = "auto"; // Sætter alle højder til auto, for at tilpasse kolonnen til indholdet
    }

    for (var i = 0; i < length; i++) {  // Denne løkke finder ud af hvilken kolonne der er højest
        if (columns[i].clientHeight > height) { // Hvis højden i funktionen ikke er den samme som elementets højde
            height = columns[i].clientHeight; // Elementets højde bliver gemt i variablen height (den største værdi bliver gemt)
        }
    }

    for (var i = 0; i < length; i++) {
        columns[i].style.height = height + "px"; // Sætter højden på alle kolonner og angiver i px
    }
}