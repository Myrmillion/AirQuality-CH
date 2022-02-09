/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */


let stations = Station.getStations()

forAllInfos()



function forAllInfos() {

    // All of this working for the same individual info (O3, NO2, ...)
    for (let infoName of INFOS_NAMES) {

        let fileRows = loadFileRows(`${PATH_TO_DB}/${infoName}.csv`);
        let fileStations = fileRows[0].split(";");

        let monthNumber = 0;
        let currentMonth = null;
        let nbDaysinMonth = 0;
        
        // To avoid header and last empty rows
        for (let row of fileRows.slice(1, -1)) {

            let rowTab = row.split(";")

            // When we change month
            if (currentMonth !== null && !checkSameMonth(rowTab[0], currentMonth)) {

                for (let i = 1; i < fileStations.length; i++) {
                    stations[fileStations[i]][infoName][monthNumber] /= nbDaysinMonth;
                }

                monthNumber++;
                nbDaysinMonth = 0;
                currentMonth = rowTab[0];

                for (let i = 1; i < fileStations.length; i++) {
                    stations[fileStations[i]][infoName][monthNumber] = 0.;
                    stations[fileStations[i]]["months"][monthNumber] = currentMonth;
                }
            }
            else if (currentMonth === null) {

                currentMonth = rowTab[0];

                for (let i = 1; i < fileStations.length; i++) {
                    stations[fileStations[i]][infoName][monthNumber] = 0.;
                    stations[fileStations[i]]["months"][monthNumber] = currentMonth;
                }
            }

            for (let i = 1; i < fileStations.length; i++) {
                stations[fileStations[i]][infoName][monthNumber] += parseFloat(rowTab[i]);
                nbDaysinMonth++;
            }
        }
    }

    console.log(stations);
}


function loadFileRows(filePath) {

    let result = null;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", filePath, false);
    xmlhttp.overrideMimeType('text/csv; charset=iso-8859-1'); // or 'text/xml; charset=iso-8859-1' or 'text/plain; charset=iso-8859-1'
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }

    fileRows = result.split("\n");

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