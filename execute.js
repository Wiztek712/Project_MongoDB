// You can execute this file and it will run the function you uncomment.

const { insertMatch, insertTeam, insertPlayer } = require('./insert.js');
const findPlayerByAgeAndPosition = require('./query.js');
const findPlayersWithMinMatches = require('./atleast.js');

// ----------------------------------Insert a Player

// insertPlayer("John", "Doe", "1990-05-14", 180, 75, "attaquant", "Belgique");

// ----------------------------------Insert a Team

// insertTeam("ASSE", ["Vert", "Blanc"], "Stade Geoffroy Guichard",
//     [
//         {firstName: "Hugo", lastName: "Lloris"},
//       {firstName: "Olivier", lastName: "Giroud"},
//       {firstName: "Kylian", lastName: "Mbappe"},
//       {firstName: "Antoine", lastName: "Griezmann"},
//       {firstName: "Blaise", lastName: "Matuidi"},
//       {firstName: "Paul", lastName: "Pogba"},
//       {firstName: "Ngolo", lastName: "Kante"},
//       {firstName: "Raphael", lastName: "Varane"},
//       {firstName: "Samuel", lastName: "Umtiti"},
//       {firstName: "Lucas", lastName: "Hernandez"},
//       { firstName: "Quentin", lastName: "Raban"}
//     ]
// );

// ----------------------------------Insert a Match

// insertMatch("France","Argentine", "match_amical", 14, 2);

// ----------------------------------Create a database with players that played at least X matches

// findPlayersWithMinMatches(5);

// ----------------------------------Find players that played at a specific postion and that are less than X years old.

// findPlayerByAgeAndPosition(25,"attaquant");