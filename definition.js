const { MongoClient, ObjectId } = require('mongodb');

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
      { _id : new ObjectId(), firstName: "Hugo", lastName: "Lloris", birthDate: "26.12.1986", height: 188, weight: 85, position: "gardien" },
      { _id : new ObjectId(), firstName: "Olivier", lastName: "Giroud", birthDate: "30.09.1986", height: 193, weight: 84, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Kylian", lastName: "Mbappe", birthDate: "20.12.1998", height: 178, weight: 77, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Antoine", lastName: "Griezmann", birthDate: "21.03.1991", height: 175, weight: 75, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Blaise", lastName: "Matuidi", birthDate: "09.04.1987", height: 180, weight: 78, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Paul", lastName: "Pogba", birthDate: "15.03.1993", height: 191, weight: 84, position: "milieu" },
      { _id : new ObjectId(), firstName: "Ngolo", lastName: "Kante", birthDate: "29.03.1991", height: 168, weight: 73, position: "milieu" },
      { _id : new ObjectId(), firstName: "Raphael", lastName: "Varane", birthDate: "25.04.1993", height: 191, weight: 83, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Samuel", lastName: "Umtiti", birthDate: "14.11.1993", height: 182, weight: 78, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Lucas", lastName: "Hernandez", birthDate: "14.02.1996", height: 184, weight: 81, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Benjamin", lastName: "Pavard", birthDate: "28.03.1996", height: 186, weight: 83, position: "defenseur" },

      // Belgium
      { _id : new ObjectId(), firstName: "Thibaut", lastName: "Courtois", birthDate: "11.05.1992", height: 199, weight: 96, position: "gardien" },
      { _id : new ObjectId(), firstName: "Toby", lastName: "Alderweireld", birthDate: "02.03.1989", height: 187, weight: 91, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Jan", lastName: "Vertonghen", birthDate: "24.04.1987", height: 189, weight: 87, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Thomas", lastName: "Meunier", birthDate: "12.09.1991", height: 191, weight: 84, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Axel", lastName: "Witsel", birthDate: "12.01.1989", height: 186, weight: 81, position: "milieu" },
      { _id : new ObjectId(), firstName: "Kevin", lastName: "De Bruyne", birthDate: "28.06.1991", height: 181, weight: 70, position: "milieu" },
      { _id : new ObjectId(), firstName: "Youri", lastName: "Tielemans", birthDate: "07.05.1997", height: 176, weight: 72, position: "milieu" },
      { _id : new ObjectId(), firstName: "Eden", lastName: "Hazard", birthDate: "07.01.1991", height: 175, weight: 74, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Romelu", lastName: "Lukaku", birthDate: "13.05.1993", height: 191, weight: 94, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Dries", lastName: "Mertens", birthDate: "06.05.1987", height: 169, weight: 61, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Yannick", lastName: "Carrasco", birthDate: "04.09.1993", height: 181, weight: 73, position: "milieu" },

      // England
      { _id : new ObjectId(), firstName: "Jordan", lastName: "Pickford", birthDate: "07.03.1994", height: 185, weight: 77, position: "gardien" },
      { _id : new ObjectId(), firstName: "Kyle", lastName: "Walker", birthDate: "28.05.1990", height: 183, weight: 80, position: "defenseur" },
      { _id : new ObjectId(), firstName: "John", lastName: "Stones", birthDate: "28.05.1994", height: 188, weight: 77, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Harry", lastName: "Maguire", birthDate: "05.03.1993", height: 194, weight: 100, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Luke", lastName: "Shaw", birthDate: "12.07.1995", height: 185, weight: 75, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Declan", lastName: "Rice", birthDate: "14.01.1999", height: 185, weight: 80, position: "milieu" },
      { _id : new ObjectId(), firstName: "Jude", lastName: "Bellingham", birthDate: "29.06.2003", height: 186, weight: 75, position: "milieu" },
      { _id : new ObjectId(), firstName: "Jordan", lastName: "Henderson", birthDate: "17.06.1990", height: 187, weight: 80, position: "milieu" },
      { _id : new ObjectId(), firstName: "Raheem", lastName: "Sterling", birthDate: "08.12.1994", height: 170, weight: 69, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Harry", lastName: "Kane", birthDate: "28.07.1993", height: 188, weight: 86, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Bukayo", lastName: "Saka", birthDate: "05.09.2001", height: 178, weight: 73, position: "attaquant" },

      // Argentina
      { _id : new ObjectId(), firstName: "Emiliano", lastName: "Martinez", birthDate: "02.09.1992", height: 195, weight: 88, position: "gardien" },
      { _id : new ObjectId(), firstName: "Nahuel", lastName: "Molina", birthDate: "06.04.1998", height: 175, weight: 70, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Cristian", lastName: "Romero", birthDate: "27.04.1998", height: 185, weight: 79, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Nicolas", lastName: "Otamendi", birthDate: "12.02.1988", height: 183, weight: 81, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Marcos", lastName: "Acuna", birthDate: "28.10.1991", height: 172, weight: 72, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Rodrigo", lastName: "De Paul", birthDate: "24.05.1994", height: 180, weight: 70, position: "milieu" },
      { _id : new ObjectId(), firstName: "Leandro", lastName: "Paredes", birthDate: "29.06.1994", height: 180, weight: 75, position: "milieu" },
      { _id : new ObjectId(), firstName: "Alexis", lastName: "Mac Allister", birthDate: "24.12.1998", height: 174, weight: 72, position: "milieu" },
      { _id : new ObjectId(), firstName: "Lionel", lastName: "Messi", birthDate: "24.06.1987", height: 170, weight: 72, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Julian", lastName: "Alvarez", birthDate: "31.01.2000", height: 170, weight: 71, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Angel", lastName: "Di Maria", birthDate: "14.02.1988", height: 180, weight: 75, position: "attaquant" }
    ];

    // Insert all players using insertMany
    const result_players = await collection_player.insertMany(players);

    console.log(`${result_players.insertedCount} players were inserted successfully.`);

    // Choose a collection
    const collection_team = database.collection("Teams");

    const frId = new ObjectId();
    const beId = new ObjectId();
    const enId = new ObjectId();
    const arId = new ObjectId();

    const teams = [
      { _id : frId, team_name: "France", colors: ["Bleu", "Blanc"], stadium: "Stade de France", players: [""]},
      { _id : beId, team_name: "Belgique", colors: ["Rouge", "Noir"], stadium: "Stade Roi Baudouin", players: [""]},
      { _id : enId, team_name: "Angleterre", colors: ["Blanc", "Rouge"], stadium: "Stade de Twickenham", players: [""]},
      { _id : arId, team_name: "Argentine", colors: ["Bleu clair", "Blanc"], stadium: "Stade de la Bombonera", players: [""]}
    ];

    // Insert all teams using insertMany
    const result_team = await collection_team.insertMany(teams);

    console.log(`${result_team.insertedCount} teams were inserted successfully.`);
    
    // Update team_id for every players
    // France players
    collection_player.updateMany(
      { lastName: { $in: ["Lloris", "Giroud", "Mbappe", "Griezmann", "Matuidi", "Pogba", "Kante", "Varane", "Umtiti", "Hernandez", "Pavard"] } },  
      { $set: { teamId: frId } }
    );

    // Belgium players
    collection_player.updateMany(
      { lastName: { $in: ["Courtois", "Alderweireld", "Vertonghen", "Meunier", "Witsel", "De Bruyne", "Tielemans", "Hazard", "Lukaku", "Mertens", "Carrasco"] } },  
      { $set: { teamId: beId } }
    );

    // England players
    collection_player.updateMany(
      { lastName: { $in: ["Pickford", "Walker", "Stones", "Maguire", "Shaw", "Rice", "Bellingham", "Henderson", "Sterling", "Kane", "Saka"] } },  
      { $set: { teamId: enId } }
    );

    // Argentina players
    collection_player.updateMany(
      { lastName: { $in: ["Martinez", "Molina", "Romero", "Otamendi", "Acuna", "De Paul", "Paredes", "Mac Allister", "Messi", "Alvarez", "Di Maria"] } },  
      { $set: { teamId: arId } }
    );

    // Update players list for each team
    const updateTeamPlayers = async (teamId) => {
      const players = await collection_player.find({ teamId }).toArray();
      const playerIds = players.map(player => player._id);
      await collection_team.updateOne(
        { _id: teamId },
        { $set: { players: playerIds } }
      );
    };

    await updateTeamPlayers(frId);
    await updateTeamPlayers(beId);
    await updateTeamPlayers(enId);
    await updateTeamPlayers(arId);

  } catch (error) {
    console.error("Error occurred while inserting data:", error);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
