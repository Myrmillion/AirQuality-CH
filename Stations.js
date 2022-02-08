/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

class Stations {

    static #instance = null

    //------------------------------------------------------------------//
    //                             Singleton                            //
    //------------------------------------------------------------------//

    constructor() {

        this.stations = []

        this.#prepareStations()
    }

    static getInstance() {
        if (this.#instance === null) {
            this.#instance = new Stations()
        }
        return this.#instance
    }

    //------------------------------------------------------------------//
    //                              Methods                             //
    //------------------------------------------------------------------//
    
    #prepareStations() {
        STATIONS_NAMES.forEach(stationName => {
            this.stations[stationName] = new Station(stationName)
        });
    }
}