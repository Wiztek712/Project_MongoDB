const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";  // MongoDB connection string (for local development)

async function main() {
  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();

    // Print a confirmation message
    console.log("Connected successfully to MongoDB server");

    // Choose a database (will create the database if it does not exist)
    const database = client.db("project");

    // Choose a collection (will create the collection if it does not exist)
    const collection_player = database.collection("Players");

    // Define the players in an array (France, Belgium, England, and Argentina)
    const players = [
      // France
      { _id : ObjectId("lloris"), firstName: "Hugo", lastName: "Lloris", birthDate: "26.12.1986", height: 188, weight: 85, position: "gardien" },
      { _id : ObjectId("giroud"), firstName: "Olivier", lastName: "Giroud", birthDate: "30.09.1986", height: 193, weight: 84, position: "attaquant" },
      { _id : ObjectId("mbappe"), firstName: "Kylian", lastName: "Mbappe", birthDate: "20.12.1998", height: 178, weight: 77, position: "attaquant" },
      { _id : ObjectId("griezmann"), firstName: "Antoine", lastName: "Griezmann", birthDate: "21.03.1991", height: 175, weight: 75, position: "attaquant" },
      { _id : ObjectId("matuidi"), firstName: "Blaise", lastName: "Matuidi", birthDate: "09.04.1987", height: 180, weight: 78, position: "attaquant" },
      { _id : ObjectId("pogba"), firstName: "Paul", lastName: "Pogba", birthDate: "15.03.1993", height: 191, weight: 84, position: "milieu" },
      { _id : ObjectId("kante"), firstName: "Ngolo", lastName: "Kante", birthDate: "29.03.1991", height: 168, weight: 73, position: "milieu" },
      { _id : ObjectId("varane"), firstName: "Raphael", lastName: "Varane", birthDate: "25.04.1993", height: 191, weight: 83, position: "defenseur" },
      { _id : ObjectId("umtiti"), firstName: "Samuel", lastName: "Umtiti", birthDate: "14.11.1993", height: 182, weight: 78, position: "defenseur" },
      { _id : ObjectId("hernandez"), firstName: "Lucas", lastName: "Hernandez", birthDate: "14.02.1996", height: 184, weight: 81, position: "defenseur" },
      { _id : ObjectId("pavard"), firstName: "Benjamin", lastName: "Pavard", birthDate: "28.03.1996", height: 186, weight: 83, position: "defenseur" },

      // Belgium
      { _id : ObjectId("courtois"), firstName: "Thibaut", lastName: "Courtois", birthDate: "11.05.1992", height: 199, weight: 96, position: "gardien" },
      { _id : ObjectId("alderweireld"), firstName: "Toby", lastName: "Alderweireld", birthDate: "02.03.1989", height: 187, weight: 91, position: "defenseur" },
      { _id : ObjectId("vertonghen"), firstName: "Jan", lastName: "Vertonghen", birthDate: "24.04.1987", height: 189, weight: 87, position: "defenseur" },
      { _id : ObjectId("meunier"), firstName: "Thomas", lastName: "Meunier", birthDate: "12.09.1991", height: 191, weight: 84, position: "defenseur" },
      { _id : ObjectId("witsel"), firstName: "Axel", lastName: "Witsel", birthDate: "12.01.1989", height: 186, weight: 81, position: "milieu" },
      { _id : ObjectId("debruyne"), firstName: "Kevin", lastName: "De Bruyne", birthDate: "28.06.1991", height: 181, weight: 70, position: "milieu" },
      { _id : ObjectId("tielemans"), firstName: "Youri", lastName: "Tielemans", birthDate: "07.05.1997", height: 176, weight: 72, position: "milieu" },
      { _id : ObjectId("hazard"), firstName: "Eden", lastName: "Hazard", birthDate: "07.01.1991", height: 175, weight: 74, position: "attaquant" },
      { _id : ObjectId("lukaku"), firstName: "Romelu", lastName: "Lukaku", birthDate: "13.05.1993", height: 191, weight: 94, position: "attaquant" },
      { _id : ObjectId("mertens"), firstName: "Dries", lastName: "Mertens", birthDate: "06.05.1987", height: 169, weight: 61, position: "attaquant" },
      { _id : ObjectId("carrasco"), firstName: "Yannick", lastName: "Carrasco", birthDate: "04.09.1993", height: 181, weight: 73, position: "milieu" },

      // England
      { _id : ObjectId("pickford"), firstName: "Jordan", lastName: "Pickford", birthDate: "07.03.1994", height: 185, weight: 77, position: "gardien" },
      { _id : ObjectId("walker"), firstName: "Kyle", lastName: "Walker", birthDate: "28.05.1990", height: 183, weight: 80, position: "defenseur" },
      { _id : ObjectId("stones"), firstName: "John", lastName: "Stones", birthDate: "28.05.1994", height: 188, weight: 77, position: "defenseur" },
      { _id : ObjectId("maguire"), firstName: "Harry", lastName: "Maguire", birthDate: "05.03.1993", height: 194, weight: 100, position: "defenseur" },
      { _id : ObjectId("shaw"), firstName: "Luke", lastName: "Shaw", birthDate: "12.07.1995", height: 185, weight: 75, position: "defenseur" },
      { _id : ObjectId("rice"), firstName: "Declan", lastName: "Rice", birthDate: "14.01.1999", height: 185, weight: 80, position: "milieu" },
      { _id : ObjectId("bellingham"), firstName: "Jude", lastName: "Bellingham", birthDate: "29.06.2003", height: 186, weight: 75, position: "milieu" },
      { _id : ObjectId("henderson"), firstName: "Jordan", lastName: "Henderson", birthDate: "17.06.1990", height: 187, weight: 80, position: "milieu" },
      { _id : ObjectId("sterling"), firstName: "Raheem", lastName: "Sterling", birthDate: "08.12.1994", height: 170, weight: 69, position: "attaquant" },
      { _id : ObjectId("kane"), firstName: "Harry", lastName: "Kane", birthDate: "28.07.1993", height: 188, weight: 86, position: "attaquant" },
      { _id : ObjectId("saka"), firstName: "Bukayo", lastName: "Saka", birthDate: "05.09.2001", height: 178, weight: 73, position: "attaquant" },

      // Argentina
      { _id : ObjectId("martinez"), firstName: "Emiliano", lastName: "Martinez", birthDate: "02.09.1992", height: 195, weight: 88, position: "gardien" },
      { _id : ObjectId("molina"), firstName: "Nahuel", lastName: "Molina", birthDate: "06.04.1998", height: 175, weight: 70, position: "defenseur" },
      { _id : ObjectId("romero"), firstName: "Cristian", lastName: "Romero", birthDate: "27.04.1998", height: 185, weight: 79, position: "defenseur" },
      { _id : ObjectId("otamendi"), firstName: "Nicolas", lastName: "Otamendi", birthDate: "12.02.1988", height: 183, weight: 81, position: "defenseur" },
      { _id : ObjectId("acuna"), firstName: "Marcos", lastName: "Acuna", birthDate: "28.10.1991", height: 172, weight: 72, position: "defenseur" },
      { _id : ObjectId("depaul"), firstName: "Rodrigo", lastName: "De Paul", birthDate: "24.05.1994", height: 180, weight: 70, position: "milieu" },
      { _id : ObjectId("paredes"), firstName: "Leandro", lastName: "Paredes", birthDate: "29.06.1994", height: 180, weight: 75, position: "milieu" },
      { _id : ObjectId("macallister"), firstName: "Alexis", lastName: "Mac Allister", birthDate: "24.12.1998", height: 174, weight: 72, position: "milieu" },
      { _id : ObjectId("messi"), firstName: "Lionel", lastName: "Messi", birthDate: "24.06.1987", height: 170, weight: 72, position: "attaquant" },
      { _id : ObjectId("alvarez"), firstName: "Julian", lastName: "Alvarez", birthDate: "31.01.2000", height: 170, weight: 71, position: "attaquant" },
      { _id : ObjectId("dimaria"), firstName: "Angel", lastName: "Di Maria", birthDate: "14.02.1988", height: 180, weight: 75, position: "attaquant" }
    ];

    // Insert all players using insertMany
    const result_players = await collection_player.insertMany(players);

    console.log(`${result_players.insertedCount} players were inserted successfully.`);

    // Choose a collection
    const collection_team = database.collection("Teams");

    const teams = [
      {team_name: "France", colors: ["Bleu", "Blanc"], stadium: "Stade de France", players: [""]},
      {team_name: "Belgique", colors: ["Rouge", "Noir"], stadium: "Stade Roi Baudouin", players: [""]},
      {team_name: "Allemagne", colors: ["Blanc", "Noir"], stadium: "Olympiastadion Berlin", players: [""]},
      {team_name: "Argentine", colors: ["Bleu clair", "Blanc"], stadium: "Stade de la Bombonera", players: [""]}
    ];

    // Insert all teams using insertMany
    const result_team = await collection_team.insertMany(teams);

    console.log(`${result_team.insertedCount} teams were inserted successfully.`);

  } catch (error) {
    console.error("Error occurred while inserting data:", error);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
