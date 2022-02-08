/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

class Station {

    static #stations = []

    constructor(name) {
        this.name = name;
        this.months = [];
        this.O3 = [];
    }

    static getStations() {
        if (!Array.isArray(this.#stations) || !this.#stations.length) {
            this.#prepareStations()
        }
        return this.#stations
    }

    //------------------------------------------------------------------//
    //                              Methods                             //
    //------------------------------------------------------------------//

    static #prepareStations() {
        for (let stationName of STATIONS_NAMES) {
            this.#stations[stationName] = new Station(stationName);
        }
    }
}