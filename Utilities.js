/**
 * date format : dd.mm.yyyy
 */
function checkSameMonth(firstDate, secondDate) {

    let firstSplit = firstDate.split(".");
    let secondSplit = secondDate.split(".");

    // year and month must be the same
    if((firstSplit[2] !== secondSplit[2]) || (firstSplit[1] !== secondSplit[1])) {
        return false;
    }
    
    return true;
}