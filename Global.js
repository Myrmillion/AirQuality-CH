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

let STATIONS = {
    NAMES: ['Bern-Bollwerk', 'Lausanne-Cesar-Roux', 'Lugano-Universita', 'Zurich-Kaserne', 'Basel-Binningen', 'Dubendorf-Empa', 'Harkingen-A1', 'Sion-Aeroport-A9',
        'Magadino-Cadenazzo', 'Payerne', 'Tanikon', 'Beromunster', 'Chaumont', 'Rigi-Seebodenalp', 'Davos-Seehornwald', 'Jungfraujoch'],
    COORDINATES: [
        [7.4405162, 46.9493136], [6.6400157, 46.5217818], [8.9574447, 46.0115256], [8.5303421, 47.3775824], [7.5835282, 47.5410508], [8.6136213, 47.4028257],
        [7.8205032, 47.3118843], [7.4152425, 46.2447781], [8.8998084, 46.1516168], [6.9391265, 46.8208047], [8.9064928, 47.4791481], [8.1924386, 47.2076373],
        [6.9642762, 47.0326487], [8.4633699, 47.0673911], [9.8651554, 46.8176779], [7.9781158, 46.5471693]
    ]
}

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