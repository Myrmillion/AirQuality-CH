/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

class Stations {

    constructor() {

        this.retrieveStations();

        this.searchMinimums();
        this.searchMaximums();
    }

    /**
     * Méthode permettant d'instancier chacune des stations en tant qu'attributs de la classe.
     * L'objet reçoit le chemin de sa base de données en paramètre.
     */
    retrieveStations() {

        let BAS = new Station("res/databases/BAS.csv");
        let BER = new Station("res/databases/BER.csv");
        let BRM = new Station("res/databases/BRM.csv");
        let CHA = new Station("res/databases/CHA.csv");
        let DAV = new Station("res/databases/DAV.csv");
        let DUE = new Station("res/databases/DUE.csv");
        let HAE = new Station("res/databases/HAE.csv");
        let JUN = new Station("res/databases/JUN.csv");
        let LAU = new Station("res/databases/LAU.csv");
        let LUG = new Station("res/databases/LUG.csv");
        let MAG = new Station("res/databases/MAG.csv");
        let PAY = new Station("res/databases/PAY.csv");
        let RIG = new Station("res/databases/RIG.csv");
        let SIO = new Station("res/databases/SIO.csv");
        let TAE = new Station("res/databases/TAE.csv");
        let ZUE = new Station("res/databases/ZUE.csv");

        this.tabStations = new Array(BAS, BER, BRM, CHA, DAV, DUE, HAE, JUN, LAU, LUG, MAG, PAY, RIG, SIO, TAE, ZUE);
    }

    /**
     * Méthode permettant de rechercher le minimum pour chaque mollécule,
     * parmis toutes les STATIONS. Insère chacun de ces minimums dans un tableau.
     */
    searchMinimums() {

        this.tabMins = new Array(this.minO3, this.minNo2, this.minso2, this.minCo, this.minPm10);

        for (let i = 0; i < this.tabMins.length; i++) {

            this.tabMins[i] = this.tabStations[7].tabMins[i];

            this.tabStations.forEach(station => {

                if (station.tabMins[i] < this.tabMins[i] && station.tabMins != undefined) {
                    this.tabMins[i] = station.tabMins[i];
                }
            });
        }
    }

    /**
     * Méthode permettant de rechercher le maximum pour chaque mollécule,
     * parmis toutes les STATIONS. Insère chacun de ces maximums dans un tableau.
     */
    searchMaximums() {

        this.tabMaxs = new Array(this.maxO3, this.maxNo2, this.maxso2, this.maxCo, this.maxPm10);

        for (let i = 0; i < this.tabMaxs.length; i++) {

            this.tabMaxs[i] = this.tabStations[7].tabMaxs[i];

            this.tabStations.forEach(station => {

                if (station.tabMaxs[i] > this.tabMaxs[i] && station.tabMaxs != undefined) {
                    this.tabMaxs[i] = station.tabMaxs[i];
                }
            });
        }
    }
}