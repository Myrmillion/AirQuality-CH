/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                     Static / Defined only ONCE                   //
//------------------------------------------------------------------//

let PATH_TO_DB = 'res/db/'

let DB_FILES = ['O3', 'NO2', 'SO2', 'CO', 'NMVOC', 'EC', 'CPC', 'TEMP', 'RAD', 'PREC', 'PM10', 'PM2.5', 'NOX']

let STATIONS_NAMES = ['Bern-Bollwerk', 'Lausanne-Cesar-Roux', 'Lugano-Universita', 'Zurich-Kaserne',
    'Basel-Binningen', 'Dubendorf-Empa', 'Harkingen-A1', 'Sion-Aeroport-A9', 'Magadino-Cadenazzo',
    'Payerne', 'Tanikon', 'Beromunster', 'Chaumont', 'Rigi-Seebodenalp', 'Davos-Seehornwald', 'Jungfraujoch']

let INFOS = {
    SHORT_NAMES: [],
    LONG_NAMES: [],
    VAR_NAMES: [],
    UNITS: []
}

FILL_INFOS();

//------------------------------------------------------------------//
//                           PREPARATION                            //
//------------------------------------------------------------------//

function FILL_INFOS() {

    for (let infoName of DB_FILES) {

        // Filling VAR_NAMES depending on DB_FILES variable
        INFOS.VAR_NAMES.push(infoName.replace(/\./g, ''));

        fileRows = loadFileRows(`${PATH_TO_DB}/${infoName}.csv`);

        for (let row of fileRows) {

            let rowTab = row.split(" ");

            if (removeDiacritics(rowTab[0]) === "Polluant:") {

                // Filling SHORT_NAMES based on the 'parenthesis names' in Files
                let string = row.substring(row.lastIndexOf('(') + 1, row.lastIndexOf(')'));
                INFOS.SHORT_NAMES.push(string);

                // Filling LONG_NAMES based on the 'non-parenthesis names' in Files
                string = '';
                for (let i = 1; i < rowTab.length; i++) {
                    if (rowTab[i][0] === '(') {
                        break;
                    }
                    string += rowTab[i] + ' ';
                }
                INFOS.LONG_NAMES.push(string.slice(0, -1));
            }

            // Filling UNITS based on the units in Files
            if (removeDiacritics(rowTab[0]) === "Unite:") {
                INFOS.UNITS.push(rowTab[1]);
                break;
            }
        }
    }
}