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
      { _id : ObjectId("lloris"), firstName: "Hugo", lastName: "Lloris", birthDate: ISODate("26-12-1986T00:00:00Z"), height: 188, weight: 85, position: "gardien" },
      { _id : ObjectId("giroud"), firstName: "Olivier", lastName: "Giroud", birthDate: ISODate("30-09-1986T00:00:00Z"), height: 193, weight: 84, position: "attaquant" },
      { _id : ObjectId("mbappe"), firstName: "Kylian", lastName: "Mbappe", birthDate: ISODate("20-12-1998T00:00:00Z"), height: 178, weight: 77, position: "attaquant" },
      { _id : ObjectId("griezmann"), firstName: "Antoine", lastName: "Griezmann", birthDate: ISODate("21-03-1991T00:00:00Z"), height: 175, weight: 75, position: "attaquant" },
      { _id : ObjectId("matuidi"), firstName: "Blaise", lastName: "Matuidi", birthDate: ISODate("09-04-1987T00:00:00Z"), height: 180, weight: 78, position: "attaquant" },
      { _id : ObjectId("pogba"), firstName: "Paul", lastName: "Pogba", birthDate: ISODate("15-03-1993T00:00:00Z"), height: 191, weight: 84, position: "milieu" },
      { _id : ObjectId("kante"), firstName: "Ngolo", lastName: "Kante", birthDate: ISODate("29-03-1991T00:00:00Z"), height: 168, weight: 73, position: "milieu" },
      { _id : ObjectId("varane"), firstName: "Raphael", lastName: "Varane", birthDate: ISODate("25-04-1993T00:00:00Z"), height: 191, weight: 83, position: "defenseur" },
      { _id : ObjectId("umtiti"), firstName: "Samuel", lastName: "Umtiti", birthDate: ISODate("14-11-1993T00:00:00Z"), height: 182, weight: 78, position: "defenseur" },
      { _id : ObjectId("hernandez"), firstName: "Lucas", lastName: "Hernandez", birthDate: ISODate("14-02-1996T00:00:00Z"), height: 184, weight: 81, position: "defenseur" },
      { _id : ObjectId("pavard"), firstName: "Benjamin", lastName: "Pavard", birthDate: ISODate("28-03-1996T00:00:00Z"), height: 186, weight: 83, position: "defenseur" },

      // Belgium
      { _id : ObjectId("courtois"), firstName: "Thibaut", lastName: "Courtois", birthDate: ISODate("11-05-1992T00:00:00Z"), height: 199, weight: 96, position: "gardien" },
      { _id : ObjectId("alderweireld"), firstName: "Toby", lastName: "Alderweireld", birthDate: ISODate("02-03-1989T00:00:00Z"), height: 187, weight: 91, position: "defenseur" },
      { _id : ObjectId("vertonghen"), firstName: "Jan", lastName: "Vertonghen", birthDate: ISODate("24-04-1987T00:00:00Z"), height: 189, weight: 87, position: "defenseur" },
      { _id : ObjectId("meunier"), firstName: "Thomas", lastName: "Meunier", birthDate: ISODate("12-09-1991T00:00:00Z"), height: 191, weight: 84, position: "defenseur" },
      { _id : ObjectId("witsel"), firstName: "Axel", lastName: "Witsel", birthDate: ISODate("12-01-1989T00:00:00Z"), height: 186, weight: 81, position: "milieu" },
      { _id : ObjectId("debruyne"), firstName: "Kevin", lastName: "De Bruyne", birthDate: ISODate("28-06-1991T00:00:00Z"), height: 181, weight: 70, position: "milieu" },
      { _id : ObjectId("tielemans"), firstName: "Youri", lastName: "Tielemans", birthDate: ISODate("07-05-1997T00:00:00Z"), height: 176, weight: 72, position: "milieu" },
      { _id : ObjectId("hazard"), firstName: "Eden", lastName: "Hazard", birthDate: ISODate("07-01-1991T00:00:00Z"), height: 175, weight: 74, position: "attaquant" },
      { _id : ObjectId("lukaku"), firstName: "Romelu", lastName: "Lukaku", birthDate: ISODate("13-05-1993T00:00:00Z"), height: 191, weight: 94, position: "attaquant" },
      { _id : ObjectId("mertens"), firstName: "Dries", lastName: "Mertens", birthDate: ISODate("06-05-1987T00:00:00Z"), height: 169, weight: 61, position: "attaquant" },
      { _id : ObjectId("carrasco"), firstName: "Yannick", lastName: "Carrasco", birthDate: ISODate("04-09-1993T00:00:00Z"), height: 181, weight: 73, position: "milieu" },

      // England
      { _id : ObjectId("pickford"), firstName: "Jordan", lastName: "Pickford", birthDate: ISODate("07-03-1994T00:00:00Z"), height: 185, weight: 77, position: "gardien" },
      { _id : ObjectId("walker"), firstName: "Kyle", lastName: "Walker", birthDate: ISODate("28-05-1990T00:00:00Z"), height: 183, weight: 80, position: "defenseur" },
      { _id : ObjectId("stones"), firstName: "John", lastName: "Stones", birthDate: ISODate("28-05-1994T00:00:00Z"), height: 188, weight: 77, position: "defenseur" },
      { _id : ObjectId("maguire"), firstName: "Harry", lastName: "Maguire", birthDate: ISODate("05-03-1993T00:00:00Z"), height: 194, weight: 100, position: "defenseur" },
      { _id : ObjectId("shaw"), firstName: "Luke", lastName: "Shaw", birthDate: ISODate("12-07-1995T00:00:00Z"), height: 185, weight: 75, position: "defenseur" },
      { _id : ObjectId("rice"), firstName: "Declan", lastName: "Rice", birthDate: ISODate("14-01-1999T00:00:00Z"), height: 185, weight: 80, position: "milieu" },
      { _id : ObjectId("bellingham"), firstName: "Jude", lastName: "Bellingham", birthDate: ISODate("29-06-2003T00:00:00Z"), height: 186, weight: 75, position: "milieu" },
      { _id : ObjectId("henderson"), firstName: "Jordan", lastName: "Henderson", birthDate: ISODate("17-06-1990T00:00:00Z"), height: 187, weight: 80, position: "milieu" },
      { _id : ObjectId("sterling"), firstName: "Raheem", lastName: "Sterling", birthDate: ISODate("08-12-1994T00:00:00Z"), height: 170, weight: 69, position: "attaquant" },
      { _id : ObjectId("kane"), firstName: "Harry", lastName: "Kane", birthDate: ISODate("28-07-1993T00:00:00Z"), height: 188, weight: 86, position: "attaquant" },
      { _id : ObjectId("saka"), firstName: "Bukayo", lastName: "Saka", birthDate: ISODate("05-09-2001T00:00:00Z"), height: 178, weight: 73, position: "attaquant" },

      // Argentina
      { _id : ObjectId("martinez"), firstName: "Emiliano", lastName: "Martinez", birthDate: ISODate("02-09-1992T00:00:00Z"), height: 195, weight: 88, position: "gardien" },
      { _id : ObjectId("molina"), firstName: "Nahuel", lastName: "Molina", birthDate: ISODate("06-04-1998T00:00:00Z"), height: 175, weight: 70, position: "defenseur" },
      { _id : ObjectId("romero"), firstName: "Cristian", lastName: "Romero", birthDate: ISODate("27-04-1998T00:00:00Z"), height: 185, weight: 79, position: "defenseur" },
      { _id : ObjectId("otamendi"), firstName: "Nicolas", lastName: "Otamendi", birthDate: ISODate("12-02-1988T00:00:00Z"), height: 183, weight: 81, position: "defenseur" },
      { _id : ObjectId("acuna"), firstName: "Marcos", lastName: "Acuna", birthDate: ISODate("28-10-1991T00:00:00Z"), height: 172, weight: 72, position: "defenseur" },
      { _id : ObjectId("depaul"), firstName: "Rodrigo", lastName: "De Paul", birthDate: ISODate("24-05-1994T00:00:00Z"), height: 180, weight: 70, position: "milieu" },
      { _id : ObjectId("paredes"), firstName: "Leandro", lastName: "Paredes", birthDate: ISODate("29-06-1994T00:00:00Z"), height: 180, weight: 75, position: "milieu" },
      { _id : ObjectId("macallister"), firstName: "Alexis", lastName: "Mac Allister", birthDate: ISODate("24-12-1998T00:00:00Z"), height: 174, weight: 72, position: "milieu" },
      { _id : ObjectId("messi"), firstName: "Lionel", lastName: "Messi", birthDate: ISODate("24-06-1987T00:00:00Z"), height: 170, weight: 72, position: "attaquant" },
      { _id : ObjectId("alvarez"), firstName: "Julian", lastName: "Alvarez", birthDate: ISODate("31-01-2000T00:00:00Z"), height: 170, weight: 71, position: "attaquant" },
      { _id : ObjectId("dimaria"), firstName: "Angel", lastName: "Di Maria", birthDate: ISODate("14-02-1988T00:00:00Z"), height: 180, weight: 75, position: "attaquant" }
    ];

    // Insert all players using insertMany
    const result_players = await collection_player.insertMany(players);

    console.log(`${result_players.insertedCount} players were inserted successfully.`);

    // Choose a collection
    const collection_team = database.collection("Teams");

    const frId = ObjectId("france");
    const beId = ObjectId("belgique");
    const alId = ObjectId("allemagne");
    const arId = ObjectId("argentine");

    const teams = [
      { _id : frId, team_name: "France", colors: ["Bleu", "Blanc"], stadium: "Stade de France", players: [""]},
      { _id : beId, team_name: "Belgique", colors: ["Rouge", "Noir"], stadium: "Stade Roi Baudouin", players: [""]},
      { _id : alId, team_name: "Allemagne", colors: ["Blanc", "Noir"], stadium: "Olympiastadion Berlin", players: [""]},
      { _id : arId, team_name: "Argentine", colors: ["Bleu clair", "Blanc"], stadium: "Stade de la Bombonera", players: [""]}
    ];

    // Insert all teams using insertMany
    const result_team = await collection_team.insertMany(teams);

    console.log(`${result_team.insertedCount} teams were inserted successfully.`);

    // Update team_id for every players
    // France players
    db.Players.updateMany(
      { lastName: { $in: ["Lloris", "Giroud", "Mbappe", "Griezmann", "Matuidi", "Pogba", "Kante", "Varane", "Umtiti", "Hernandez", "Pavard"] } },  
      { $set: { teamId: frId } }
    );

    // Belgium players
    db.Players.updateMany(
      { lastName: { $in: ["Courtois", "Alderweireld", "Vertonghen", "Meunier", "Witsel", "De Bruyne", "Tielemans", "Hazard", "Lukaku", "Mertens", "Carrasco"] } },  
      { $set: { teamId: beId } }
    );

    // England players
    db.Players.updateMany(
      { lastName: { $in: ["Pickford", "Walker", "Stones", "Maguire", "Shaw", "Rice", "Bellingham", "Henderson", "Sterling", "Kane", "Saka"] } },  
      { $set: { teamId: enId } }
    );

    // Argentina players
    db.Players.updateMany(
      { lastName: { $in: ["Martinez", "Molina", "Romero", "Otamendi", "Acuna", "De Paul", "Paredes", "Mac Allister", "Messi", "Alvarez", "Di Maria"] } },  
      { $set: { teamId: arId } }
    );

    // Update player_list for each team
    // Update France team
    const francePlayers = db.Players.find(
      { teamId: frId },
      { _id: 1 }  // Select only the player IDs
    ).toArray().map(player => player._id);

    db.Teams.updateOne(
      { _id: frId },
      { $set: { players: francePlayers } }
    );

    // Update Belgium team
    const belgiumPlayers = db.Players.find(
      { teamId: beId },
      { _id: 1 }
    ).toArray().map(player => player._id);

    db.Teams.updateOne(
      { _id: beId },
      { $set: { players: belgiumPlayers } }
    );

    // Update England team
    const englandPlayers = db.Players.find(
      { teamId: enId },
      { _id: 1 }
    ).toArray().map(player => player._id);

    db.Teams.updateOne(
      { _id: enId },
      { $set: { players: englandPlayers } }
    );

    // Update Argentina team
    const argentinaPlayers = db.Players.find(
      { teamId: arId },
      { _id: 1 }
    ).toArray().map(player => player._id);

    db.Teams.updateOne(
      { _id: arId },
      { $set: { players: argentinaPlayers } }
    );
    
  } catch (error) {
    console.error("Error occurred while inserting data:", error);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
