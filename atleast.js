// Query for finding players that have played at least X matches and creating a collection with these players and their average mark over their matches.

const connect = require('./connection.js');

async function findPlayersWithMinMatches(minAppearances) {

  // Retrieve database collections
  const [client, database, collection_player, collection_team, collection_match] = await connect();

  try{
    // Aggregate method in order to collect the players (and their marks) that have played more than "minAppearances" matches.
    const result = await collection_match.aggregate([
      { $unwind: "$home_team_players" }, // In home_team_players, we get players'id and marks
      { $project: {
          playerId: "$home_team_players.playerId",
          mark: "$home_team_players.mark"
        }
      },
      { $unionWith: { // we aggregate both away and home team players because same players may play different matches and be in a different team.
          coll: "Matches",
          pipeline: [
            { $unwind: "$away_team_players" },
            { $project: { 
                  playerId: "$away_team_players.playerId",
                  mark : "$away_team_players.mark"}
              }
          ]
        }
      },
  
      { $group: { // Then we group players by Id, and we count how many times they appeared and their marks.
          _id: "$playerId",
          totalMarks: { $sum: "$mark" },
          appearanceCount: { $sum: 1 } 
        }
      },

      { $match: { // Now we only get the ones that play at least "minAppearances" matches.
          appearanceCount: { $gte: minAppearances }
        }
      },
      { $project: { // Finally we want to display the average mark and the id of each players (IDs are already given within the query).
            averageMark: { $round: [{ $divide: ["$totalMarks", "$appearanceCount"] }, 2] }
          }
      }
    ]).toArray(); // We convert it into an array.


    // The name of the collection depends on the minimum of appearances we chose.
    const collection_name = `PlayersAtLeast_${minAppearances}`;
    // Check if the collection exists.
    const collections = await database.listCollections({ name: collection_name }).toArray();

    // If the collection exists, drop it to avoid bugs.
    if (collections.length > 0) {
        await database.collection(collection_name).drop();
        console.log(`Collection ${collection_name} dropped.`);
    }

    const collection_player_at_least = database.collection(collection_name);

    // Now we add all the information about the players selected taht are stored in Players collection and their average mark, into the new collection.
    for(let i=0; i<result.length; i++){

        const player_to_add = await collection_player.findOne({_id : result[i]._id});

        await collection_player_at_least.insertOne(player_to_add);

        collection_player_at_least.updateOne(
            { _id: result[i]._id },
            { $set: { mark: result[i].averageMark } }
        );
    }
    console.log(`Collection ${collection_name} created.`);
  }
  catch (error) {
      console.error("Error occurred while inserting data:", error);
  }
  finally{
      await client.close();
  }
}

module.exports = findPlayersWithMinMatches;