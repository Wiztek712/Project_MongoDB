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
      { _id : new ObjectId(), firstName: "Hugo", lastName: "Lloris", birthDate: new Date("1986-12-26T00:00:00Z"), height: 188, weight: 85, position: "gardien" },
      { _id : new ObjectId(), firstName: "Olivier", lastName: "Giroud", birthDate: new Date("1986-09-30T00:00:00Z"), height: 193, weight: 84, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Kylian", lastName: "Mbappe", birthDate: new Date("1998-12-20T00:00:00Z"), height: 178, weight: 77, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Antoine", lastName: "Griezmann", birthDate: new Date("1991-03-21T00:00:00Z"), height: 175, weight: 75, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Blaise", lastName: "Matuidi", birthDate: new Date("1987-04-09T00:00:00Z"), height: 180, weight: 78, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Paul", lastName: "Pogba", birthDate: new Date("1993-03-15T00:00:00Z"), height: 191, weight: 84, position: "milieu" },
      { _id : new ObjectId(), firstName: "Ngolo", lastName: "Kante", birthDate: new Date("1991-03-29T00:00:00Z"), height: 168, weight: 73, position: "milieu" },
      { _id : new ObjectId(), firstName: "Raphael", lastName: "Varane", birthDate: new Date("1993-04-25T00:00:00Z"), height: 191, weight: 83, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Samuel", lastName: "Umtiti", birthDate: new Date("1993-11-14T00:00:00Z"), height: 182, weight: 78, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Lucas", lastName: "Hernandez", birthDate: new Date("1996-02-14T00:00:00Z"), height: 184, weight: 81, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Benjamin", lastName: "Pavard", birthDate: new Date("1996-03-28T00:00:00Z"), height: 186, weight: 83, position: "defenseur" },

      // Belgium
      { _id : new ObjectId(), firstName: "Thibaut", lastName: "Courtois", birthDate: new Date("1992-05-11T00:00:00Z"), height: 199, weight: 96, position: "gardien" },
      { _id : new ObjectId(), firstName: "Toby", lastName: "Alderweireld", birthDate: new Date("1989-03-02T00:00:00Z"), height: 187, weight: 91, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Jan", lastName: "Vertonghen", birthDate: new Date("1987-04-24T00:00:00Z"), height: 189, weight: 87, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Thomas", lastName: "Meunier", birthDate: new Date("1991-09-12T00:00:00Z"), height: 191, weight: 84, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Axel", lastName: "Witsel", birthDate: new Date("1989-01-12T00:00:00Z"), height: 186, weight: 81, position: "milieu" },
      { _id : new ObjectId(), firstName: "Kevin", lastName: "De Bruyne", birthDate: new Date("1991-06-28T00:00:00Z"), height: 181, weight: 70, position: "milieu" },
      { _id : new ObjectId(), firstName: "Youri", lastName: "Tielemans", birthDate: new Date("1997-05-07T00:00:00Z"), height: 176, weight: 72, position: "milieu" },
      { _id : new ObjectId(), firstName: "Eden", lastName: "Hazard", birthDate: new Date("1991-01-07T00:00:00Z"), height: 175, weight: 74, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Romelu", lastName: "Lukaku", birthDate: new Date("1993-05-13T00:00:00Z"), height: 191, weight: 94, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Dries", lastName: "Mertens", birthDate: new Date("1987-05-06T00:00:00Z"), height: 169, weight: 61, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Yannick", lastName: "Carrasco", birthDate: new Date("1993-09-04T00:00:00Z"), height: 181, weight: 73, position: "milieu" },

      // England
      { _id : new ObjectId(), firstName: "Jordan", lastName: "Pickford", birthDate: new Date("1994-03-07T00:00:00Z"), height: 185, weight: 77, position: "gardien" },
      { _id : new ObjectId(), firstName: "Kyle", lastName: "Walker", birthDate: new Date("1990-05-28T00:00:00Z"), height: 183, weight: 80, position: "defenseur" },
      { _id : new ObjectId(), firstName: "John", lastName: "Stones", birthDate: new Date("1994-05-28T00:00:00Z"), height: 188, weight: 77, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Harry", lastName: "Maguire", birthDate: new Date("1993-03-05T00:00:00Z"), height: 194, weight: 100, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Luke", lastName: "Shaw", birthDate: new Date("1995-07-12T00:00:00Z"), height: 185, weight: 75, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Declan", lastName: "Rice", birthDate: new Date("1999-01-14T00:00:00Z"), height: 185, weight: 80, position: "milieu" },
      { _id : new ObjectId(), firstName: "Jude", lastName: "Bellingham", birthDate: new Date("2003-06-29T00:00:00Z"), height: 186, weight: 75, position: "milieu" },
      { _id : new ObjectId(), firstName: "Jordan", lastName: "Henderson", birthDate: new Date("1990-06-17T00:00:00Z"), height: 187, weight: 80, position: "milieu" },
      { _id : new ObjectId(), firstName: "Raheem", lastName: "Sterling", birthDate: new Date("1994-12-08T00:00:00Z"), height: 170, weight: 69, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Harry", lastName: "Kane", birthDate: new Date("1993-07-28T00:00:00Z"), height: 188, weight: 86, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Bukayo", lastName: "Saka", birthDate: new Date("2001-09-05T00:00:00Z"), height: 178, weight: 73, position: "attaquant" },

      // Argentina
      { _id : new ObjectId(), firstName: "Emiliano", lastName: "Martinez", birthDate: new Date("1992-09-02T00:00:00Z"), height: 195, weight: 88, position: "gardien" },
      { _id : new ObjectId(), firstName: "Nahuel", lastName: "Molina", birthDate: new Date("1998-04-06T00:00:00Z"), height: 175, weight: 70, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Cristian", lastName: "Romero", birthDate: new Date("1998-04-27T00:00:00Z"), height: 185, weight: 79, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Nicolas", lastName: "Otamendi", birthDate: new Date("1988-02-12T00:00:00Z"), height: 183, weight: 81, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Marcos", lastName: "Acuna", birthDate: new Date("1991-10-28T00:00:00Z"), height: 172, weight: 72, position: "defenseur" },
      { _id : new ObjectId(), firstName: "Rodrigo", lastName: "De Paul", birthDate: new Date("1994-05-24T00:00:00Z"), height: 180, weight: 70, position: "milieu" },
      { _id : new ObjectId(), firstName: "Leandro", lastName: "Paredes", birthDate: new Date("1994-06-29T00:00:00Z"), height: 180, weight: 75, position: "milieu" },
      { _id : new ObjectId(), firstName: "Alexis", lastName: "Mac Allister", birthDate: new Date("1998-12-24T00:00:00Z"), height: 174, weight: 72, position: "milieu" },
      { _id : new ObjectId(), firstName: "Lionel", lastName: "Messi", birthDate: new Date("1987-06-24T00:00:00Z"), height: 170, weight: 72, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Julian", lastName: "Alvarez", birthDate: new Date("2000-01-31T00:00:00Z"), height: 170, weight: 71, position: "attaquant" },
      { _id : new ObjectId(), firstName: "Angel", lastName: "Di Maria", birthDate: new Date("1988-02-14T00:00:00Z"), height: 180, weight: 75, position: "attaquant" }
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

    // Match creation
    const collection_match = database.collection("Matches");

    const semi_final_1 = new ObjectId();
    const semi_final_2 = new ObjectId();

    const matches = [
      {
        _id : semi_final_1,
        home_team_name: frId,
        away_team_name: beId,
        competition: "WorldCup",
        home_team_score: "3",
        away_team_score: "0",
        home_team_players: [],
        home_team_players: [
          {
            player_name:"",
            mark:""
          },
          {
            player_name:"",
            mark:""
          }
        ],
      },
      {
        _id : semi_final_2,
        home_team_name: arId,
        away_team_name: enId,
        competition: "WorldCup",
        home_team_score: "2",
        away_team_score: "1",
        home_team_players: [],
        away_team_players: []
      }
    ];

    // Insert all matches using insertMany
    const result_match = await collection_match.insertMany(matches);

    console.log(`${result_match.insertedCount} matches were inserted successfully.`);
    
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

    // Update matches list for each team
    const updateMatchPlayers = async (matchId) => {

      const home_team_id = await collection_match.find({ matchId }).home_team_name;

      const players_home_team = await collection_match.find({ match_to_update }).toArray();
      for (let i = 0; i < 12; i++) {
        const player_name_to_insert = players_home_team[i].lastName;
        const player_mark_to_insert = 0;
        const player_to_insert = { player_name: player_name_to_insert, mark: player_mark_to_insert };
        const result = await db.collection('matches').updateOne(
          { _id: matchId },
          {
            $push: {
              home_team_players: player_to_insert
            }
          }
        );
      }

      const away_team_id = await collection_match.find({ matchId }).away_team_name;

      const players_away_team = await collection_match.find({ away_team_id }).toArray();
      for (let i = 0; i < 12; i++) {
        const player_name_to_insert = players_away_team;
        const player_mark_to_insert = 0;
        const player_to_insert = { player_name: player_name_to_insert, mark: player_mark_to_insert };
        const result = await db.collection('matches').updateOne(
          { _id: matchId },
          {
            $push: {
              home_team_players: player_to_insert
            }
          }
        );
      }

    };

    await updateMatchPlayers(semi_final_1);
    await updateMatchPlayers(semi_final_2);

  } catch (error) {
    console.error("Error occurred while inserting data:", error);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
