/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

class Station {

    constructor(name) {
        this.name = name;

        this.dateheure = [];
        this.o3 = [];
        this.no2 = [];
        this.so2 = [];
        this.co = [];
        this.pm10 = [];

        this.retrieveDatas();

        this.searchMinimums();
        this.searchMaximums();

        this.averagePerMonth();
    }

    /**
     * Méthode permettant d'insérer les données dans les bons tableaux correspondant.
     */
    retrieveDatas() {
        let resultRowTab = Station.loadFileRows(this.name);
        let titles = resultRowTab[0].split(";");

        resultRowTab.forEach((line) => {
            if (resultRowTab.indexOf(line) != 0) {
                let i = 0;

                let lineTab = line.split(";");

                lineTab.forEach((element) => {
                    switch (titles[i]) {
                        case "Date/heure":
                            this.dateheure.push(element);
                            break;

                        case "O3":
                            this.o3.push(element);
                            break;

                        case "NO2":
                            this.no2.push(element);
                            break;

                        case "SO2":
                            this.so2.push(element);
                            break;

                        case "CO":
                            this.co.push(element);
                            break;

                        case "PM10":
                            this.pm10.push(element);
                            break;
                    }
                    i++;
                });
            }
        });
    }

    /**
     * Méthode permettant de rechercher le minimum pour chaque particule de la station.
     * Insère chacun de ces minimums dans un tableau.
     */
    searchMinimums() {

        let tabParticules = new Array(this.o3, this.no2, this.so2, this.co, this.pm10);
        this.tabMins = new Array("", "", "", "", "");

        for (let i = 0; i < tabParticules.length; i++) {

            if (tabParticules[i].length > 0) {

                this.tabMins[i] = tabParticules[i][6202];

                tabParticules[i].forEach(element => {
                    if (parseFloat(element, 10) < this.tabMins[i]) {
                        this.tabMins[i] = parseFloat(element, 10);
                    }
                });
            }
        }
    }

    /**
     * Méthode permettant de rechercher le maximum pour chaque particule de la station.
     * Insère chacun de ces maximums dans un tableau.
     */
    searchMaximums() {

        let tabParticules = new Array(this.o3, this.no2, this.so2, this.co, this.pm10);
        this.tabMaxs = new Array("", "", "", "", "");

        for (let i = 0; i < tabParticules.length; i++) {

            if (tabParticules[i].length > 0) {

                this.tabMaxs[i] = tabParticules[i][6202];

                tabParticules[i].forEach(element => {
                    if (parseFloat(element, 10) > this.tabMaxs[i]) {
                        this.tabMaxs[i] = parseFloat(element, 10);
                    }
                });
            }
        }
    }

    /**
     * Méthode permettant de calculer la moyenne par mois de chaque mois depuis janvier 2010,
     * jusqu'à mai 2020 pour chaque particule de la station.
     */
    averagePerMonth() {

        let tabParticules = new Array(this.o3, this.no2, this.so2, this.co, this.pm10);
        let tabTotals = new Array(0, 0, 0, 0, 0);
        this.tabMonthly = new Array([], [], [], [], []);

        let currentMonth = this.dateheure[0].substring(3, 10);
        let tabNbDaysInMonthForParticule = new Array(0, 0, 0, 0, 0);

        for (let i = 0; i < this.dateheure.length; i++) {

            if (currentMonth == this.dateheure[i].substring(3, 10) && i != this.dateheure.length - 1) {

                tabParticules.forEach(element => {

                    if (element.length != 0 && element[i] != "") {

                        tabTotals[tabParticules.indexOf(element)] += parseFloat(element[i], 10);

                        tabNbDaysInMonthForParticule[tabParticules.indexOf(element)] += 1;
                    }
                });
            }
            else {

                //Pour le tout dernier mois.
                if (i == this.dateheure.length - 1) {
                    tabParticules.forEach(element => {

                        if (element.length != 0 && element[i] != "") {

                            tabTotals[tabParticules.indexOf(element)] += parseFloat(element[i], 10);

                            tabNbDaysInMonthForParticule[tabParticules.indexOf(element)] += 1;
                        }
                    });
                }

                //Permet d'insérer la moyenne à la suite (push) dans le tableau de la particule correspondante.
                this.tabMonthly.forEach(element => {

                    if (tabNbDaysInMonthForParticule[this.tabMonthly.indexOf(element)] != 0) {

                        element.push([currentMonth, tabTotals[this.tabMonthly.indexOf(element)] / tabNbDaysInMonthForParticule[this.tabMonthly.indexOf(element)]]);
                    }
                    else {
                        element.push([currentMonth, 0]);
                    }
                });

                //On réinitialise (intelligement) tous les paramètres puisque l'on va passer au mois suivant.
                currentMonth = this.dateheure[i].substring(3, 10);

                for (let i = 0; i < tabNbDaysInMonthForParticule.length; i++) {
                    tabNbDaysInMonthForParticule[i] = 0;
                }

                tabParticules.forEach(element => {

                    if (element.length != 0 && element[i] != "") {

                        tabTotals[tabParticules.indexOf(element)] = parseFloat(element[i], 10);

                        tabNbDaysInMonthForParticule[tabParticules.indexOf(element)] += 1;
                    }
                });
            }
        }
    }

    /**
     * Méthode utilitaire static permettant de lire un fichier et de renvoyer son contenu,
     * ligne par ligne dans une variable de type string.
     */
    static loadFileRows(filePath) {

        let result = null;
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.open("GET", filePath, false);
        xmlhttp.send();

        if (xmlhttp.status == 200) {
            result = xmlhttp.responseText;
        }

        return result.split("\n");
    }
}