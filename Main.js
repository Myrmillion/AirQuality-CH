/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */


let stations = Station.getStations()

forAllInfos()



function forAllInfos() {

    for (let station of stations) {

        

        for (let infoName of INFOS_NAMES) {

            let fileRows = loadFileRows(`${PATH_TO_DB}/${infoName}.csv`)
            let headers = fileRows[0].split(";")

            console.log(headers)

            for (let row of fileRows) {
                index = fileRows.indexOf(row);
            }
        }
    }
}

function loadFileRows(filePath) {

    let result = null;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }

    fileRows = result.split("\n");

    for (let row of fileRows) {

        if (row.split(";")[0] === "Date/heure") {

            index = fileRows.indexOf(row);
            fileRows.splice(0, index);

            break;
        }
    }

    return fileRows;
}