/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                            VARIABLES                             //
//------------------------------------------------------------------//

// Stations (singleton)
let stations = Station.getStations()

//------------------------------------------------------------------//
//                      LOCAL SMALL UTILITIES                       //
//------------------------------------------------------------------//

function normalizePerMonthByNbOfDays(fileStations, infoName, monthNumber, nbDaysinMonth) {

    for (let i = 1; i < fileStations.length; i++) {
        let stationName = fileStations[i];
        stations[stationName][infoName][monthNumber.m] /= nbDaysinMonth[stationName];
        nbDaysinMonth[stationName] = 0;
    }

    monthNumber.m++;
}

function initializeFirstInfo(currentMonth, month, fileStations, infoName, monthNumber) {

    currentMonth.m = month;

    for (let i = 1; i < fileStations.length; i++) {

        let stationName = fileStations[i];
        stations[stationName][infoName][monthNumber] = 0.;
        stations[stationName]["months"][monthNumber] = currentMonth.m;
    }
}

function initializeOtherInfo(currentMonth, month, fileStations, infoName, monthNumber) {

    currentMonth.m = month;

    for (let i = 1; i < fileStations.length; i++) {

        stations[fileStations[i]][infoName][monthNumber] = 0.;
    }
}

function updateInfo(fileStations, infoName, monthNumber, rowTab, nbDaysinMonth) {

    for (let i = 1; i < fileStations.length; i++) {

        let stationName = fileStations[i];

        if (rowTab[i] !== "") {
            stations[stationName][infoName][monthNumber] += parseFloat(rowTab[i]);
            nbDaysinMonth[stationName] += 1;
        }
    }
}

//------------------------------------------------------------------//
//     RETRIEVE FILES ELEMENTS (infos + months) AND STORE THEM      //
//------------------------------------------------------------------//

function retrieveAndStoreElements() {

    let firstInfo = true

    // All of this working for the same individual info (O3, NO2, ...)
    for (let infoName of DB_FILES) {

        // Receiving the rows and extracting stations directly
        let fileRows = loadAndPrepareFile(`${PATH_TO_DB}/${infoName}.csv`);
        let fileStations = fileRows[0].split(";");

        // replace by the 'variable names' of infos (not the file names)
        infoName = INFOS.VAR_NAMES[DB_FILES.indexOf(infoName)];

        // doing this for reference-passing
        let monthNumber = { m: 0 };
        let currentMonth = { m: null };

        // initialization of nbDaysInMonth
        let nbDaysinMonth = [];
        for (let station of STATIONS.NAMES) {
            nbDaysinMonth[station] = 0;
        }

        if (!firstInfo) {

            // We slice the header row and last empty row out to avoid them
            for (let row of fileRows.slice(1, -1)) {

                let rowTab = row.split(";");

                // When we change month
                if (currentMonth.m !== null && !checkSameMonthAndYear(rowTab[0], currentMonth.m)) {
                    normalizePerMonthByNbOfDays(fileStations, infoName, monthNumber, nbDaysinMonth);
                    initializeOtherInfo(currentMonth, rowTab[0], fileStations, infoName, monthNumber.m);
                }
                else if (currentMonth.m === null) {
                    initializeOtherInfo(currentMonth, rowTab[0], fileStations, infoName, monthNumber.m);
                }

                updateInfo(fileStations, infoName, monthNumber.m, rowTab, nbDaysinMonth);
            }
        }
        else {

            // We slice the header row and last empty row out to avoid them
            for (let row of fileRows.slice(1, -1)) {

                let rowTab = row.split(";");

                // When we change month
                if (currentMonth.m !== null && !checkSameMonthAndYear(rowTab[0], currentMonth.m)) {
                    normalizePerMonthByNbOfDays(fileStations, infoName, monthNumber, nbDaysinMonth);
                    initializeFirstInfo(currentMonth, rowTab[0], fileStations, infoName, monthNumber.m);
                }
                else if (currentMonth.m === null) {
                    initializeFirstInfo(currentMonth, rowTab[0], fileStations, infoName, monthNumber.m);
                }

                updateInfo(fileStations, infoName, monthNumber.m, rowTab, nbDaysinMonth);
            }
        }

        normalizePerMonthByNbOfDays(fileStations, infoName, monthNumber, nbDaysinMonth);

        firstInfo = false
    }
}

function retrieveMinMaxPerInfoMonthStation() {

    for (let stationName of STATIONS.NAMES) {

        let station = stations[stationName];
        let months = station["months"];
        let groupedMonths = groupSameMonths(months);

        for (let infoName of INFOS.VAR_NAMES) {

            let min = Infinity;
            let max = -Infinity;

            station.mins[infoName] = {};
            station.maxs[infoName] = {};

            for (let month in groupedMonths) {
                for (let date of groupedMonths[month]) {

                    let value = station[infoName][months.indexOf(date)];

                    min = (value < min) ? value : min;
                    max = (value > max) ? value : max;
                }
                
                station.mins[infoName][month] = min;
                station.maxs[infoName][month] = max;

                min = Infinity;
                max = -Infinity;
            }
        }
    }
}

//------------------------------------------------------------------//
//                     LOAD AND PREPARE ONE FILE                    //
//------------------------------------------------------------------//

function loadAndPrepareFile(filePath) {

    fileRows = loadFileRows(filePath);

    for (let row of fileRows) {

        if (row.split(";")[0] === "Date/heure") {

            // get index of header row
            index = fileRows.indexOf(row);

            // deal with special french characters on header row
            fileRows[index] = removeDiacritics(row);

            // remove all rows prior to the header row
            fileRows = fileRows.slice(index);

            break;
        }
    }

    return fileRows;
}