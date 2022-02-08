/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                          Global Variables                        //
//------------------------------------------------------------------//

// Ces variables doivent être globales car elles sont utilisées dans plusieurs méthodes
let particuleIndex = 0;
let monthIndex = 0;


//Ces variables sont globales car elles sont utilisées dans plusieurs méthodes et également car
//elles sont très FRÉQUEMMENT utilisées et peuvent prendre du temps à charger.
//Il vaut alors mieux les instancier une seule fois au démarrage plutôt que de le faire à chaque
//nouvelle valeur obtenue par le slider (par exemple).

let stations = new Stations();

//https://www.coordonnees-gps.fr/
let coordinates = [
    [7.5835282, 47.5410508], [7.4405162, 46.9493136], [8.1924386, 47.2076373], [6.9642762, 47.0326487],
    [9.8651554, 46.8176779], [8.6136213, 47.4028257], [7.8205032, 47.3118843], [7.9781158, 46.5471693],
    [6.6400157, 46.5217818], [8.9574447, 46.0115256], [8.8998084, 46.1516168], [6.9391265, 46.8208047],
    [8.4633699, 47.0673911], [7.4152425, 46.2447781], [8.9064928, 47.4791481], [8.5303421, 47.3775824]
];

let tabMonthsName = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

//------------------------------------------------------------------//
//                             Utilities                            //
//------------------------------------------------------------------//

/**
 * Fonction permettant de convertir la valeur numérique du mois en un string et de l'afficher.
 * Permet également d'attribuer la valeur -1 à la variable particuleIndex dans le cas où aucn
 * choix n'a été fait dans la liste de choix.
 * Ajoute l'avertissement quand à la préliminarité des données de l'année en cours.
 */
 function choosenMonthDisplay() {

    let displayMonth = document.getElementById("chosen_month");

    let monthToDisplay = stations.tabStations[0].tabMonthly[0][monthIndex][0];

    displayMonth.innerHTML = "Mois choisi : " + tabMonthsName[monthToDisplay.substring(0, 2) - 1] + " " + monthToDisplay.substring(3, 8);

    if (document.getElementById("select_particule").value == "") {
        particuleIndex = -1;
    }

    if (monthToDisplay.substring(3, 8) == "2020") {
        document.getElementById("info").innerHTML = "(Les valeurs mesurées pour l'année en cours sont préliminaires et n'ont pas encore été vérifiées de manière définitive.)";
    }
    else {
        document.getElementById("info").innerHTML = "";
    }
}

/**
 * Fonction permettant de donner le bon index correspondant en fonction de 
 * la particule sélectionnée dans la liste de choix.
 */
function whichParticule() {

    let selectedParticule = document.getElementById("select_particule").value;
    let tabParticules = ["O3", "NO2", "SO2", "CO", "PM10"];

    for (let i = 0; i < tabParticules.length; i++) {

        if (tabParticules[i] == selectedParticule) {
            particuleIndex = i;
        }
    }
}

/**
 * Fonction permettant la mise à jour des stations.
 * Ici on créée des objets qui sont compatibles avec l'API mapbox et qui pourront
 * facilement être dessinés sur la map.
 * On donne à chacun de ces objets les coordonnées correspondant à sa station et
 * la couleur correspondant à sa station, sa particule et son mois.
 * Chacun de ces objets sont mis dans un tableau et sont passés à la fonction drawStations.
 */
function updateStations() {

    let allStations = stations.tabStations;

    let tabDrawingInfos = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    for (let i = 0; i < tabDrawingInfos.length; i++) {

        let monthValue = allStations[i].tabMonthly[particuleIndex][monthIndex][1];

        if (monthValue == 0) {
            tabDrawingInfos[i] = { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': coordinates[i] }, 'properties': { 'color': '129, 129, 129' } };
        }
        else {
            let guessedColor = colorGuesser(monthValue, stations.tabMins[particuleIndex], stations.tabMaxs[particuleIndex]);

            tabDrawingInfos[i] = { 'type': 'Feature', 'geometry': { 'type': 'Point', 'coordinates': coordinates[i] }, 'properties': { 'color': guessedColor, 'title': monthValue.toFixed(2) } };
        }
    }

    drawStations(tabDrawingInfos);
}

/**
 * Fonction permettant à l'aide de la moyenne du mois de la particule sélectionnée,
 * ainsi que de la valeur minimum et de la valeur maximum de la particule sélectionnée, de 
 * choisir une couleur entre le rouge (255,0,0) et le vert (0,255,0) et toutes les variances
 * entre le deux.
 */
function colorGuesser(monthValue, minValue, maxValue) {

    let colorString = "0, 191, 255";

    let redPercent = (((monthValue - minValue) * 100) / (maxValue - minValue)).toFixed(2);
    let greenPercent = 100 - redPercent;

    let red255 = 255 * (redPercent / 100);
    let green255 = 255 * (greenPercent / 100);

    colorString = red255 + ', ' + green255 + ', 0';

    return colorString;
}