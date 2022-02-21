/**
 *   @Author Guillaume Digier
 *   @Title Mini-Project : Study of air quality in Switzerland
 *   @Date 08/02/2022
 */

//------------------------------------------------------------------//
//                           From HTML                              //
//------------------------------------------------------------------//



//------------------------------------------------------------------//
//                               Main                               //
//------------------------------------------------------------------//

function main() {

    // Ask the retrieval and the storing of Elements from files in a month fashion
    retrieveAndStoreElements();

    // Ask the retrieval of the minimal and maximal values per info and sation in a month fashion
    retrieveMinMaxPerInfoMonthStation();

    // Print the resulting stations with their per month Elements
    console.log(stations);

    // Print the resulting stations with their per month Elements
    console.log(INFOS);
}


main(); // ---> the start of the program !