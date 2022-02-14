/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                     Static / Defined only once                   //
//------------------------------------------------------------------//

let PATH_TO_DB = 'res/db/'

let DB_FILES = ['O3', 'NO2', 'SO2', 'CO', 'NMVOC', 'EC', 'CPC', 'TEMP', 'RAD', 'PREC', 'PM10', 'PM2.5', 'NOX']

let STATIONS_NAMES = ['Bern-Bollwerk', 'Lausanne-Cesar-Roux', 'Lugano-Universita', 'Zurich-Kaserne',
    'Basel-Binningen', 'Dubendorf-Empa', 'Harkingen-A1', 'Sion-Aeroport-A9', 'Magadino-Cadenazzo',
    'Payerne', 'Tanikon', 'Beromunster', 'Chaumont', 'Rigi-Seebodenalp', 'Davos-Seehornwald', 'Jungfraujoch']

let INFOS = {
    SHORT_NAME: FILL_INFOS_NAMES,
    LONG_NAME:
    UNITS: []
}

FILL_INFOS_UNITS();

//------------------------------------------------------------------//
//                           PREPARATION                            //
//------------------------------------------------------------------//

function FILL_INFOS_NAMES() {

    let array = []

    for (let infoName of DB_FILES) {
        array.push(infoName.replace(/\./g,''));
    }


}

function FILL_INFOS_UNITS() {

    for (let infoName of INFOS.NAMES) {

        fileRows = loadFileRows(`${PATH_TO_DB}/${infoName}.csv`);

        for (let row of fileRows) {

            let rowTab = row.split(" ");

            if (removeDiacritics(rowTab[0]) === "Unite:") {

                INFOS.UNITS.push(rowTab[1]);
                break;
            }
        }
    }
}