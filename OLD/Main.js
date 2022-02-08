/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                           From HTML                              //
//------------------------------------------------------------------//

/**
 * Fonction appelée lorsque la valeur de l'input 'range_month' change dans le HTMl.
 */
function updateMonth() {

    monthIndex = document.getElementById("range_month").value;

    choosenMonthDisplay();

    if (particuleIndex > -1) {
        updateStations();
    }
}

/**
 * Fonction appelée lorsque la valeur de l'input de la liste de choix change dans le HTML.
 */
function updateParticule() {

    whichParticule();
    updateStations();
}

//------------------------------------------------------------------//
//                               Main                               //
//------------------------------------------------------------------//

/**
 * La fonction "main" qui s'occupe de la récupération des données inputs de l'utilisateur.
 */
function main() {

    document.getElementById("range_month").value = 254;
    document.getElementById("chosen_month").innerHTML = "Mois choisi : Mai 2020";
    document.getElementById("info").innerHTML = "(Les valeurs mesurées pour l'année en cours sont préliminaires et n'ont pas encore été vérifiées de manière définitive.)";
    document.getElementById("select_particule").value = "";
}

main();