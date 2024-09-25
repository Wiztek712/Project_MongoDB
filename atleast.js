const connect = require('./connection');

async function findPlayersWithMinMatches(minAppearances) {
    const [client, database, collection_player, collection_team, collection_match] = await connect();
    try{
        const result = await collection_match.aggregate([

            { $unwind: "$home_team_players" },
            { $project: {
                playerId: "$home_team_players.playerId",
                mark: "$home_team_players.mark"
              }
            },
            { $unionWith: {
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
        
            { $group: {
                _id: "$playerId",
                totalMarks: { $sum: "$mark" },
                appearanceCount: { $sum: 1 } 
              }
            },

            { $match: {
                appearanceCount: { $gte: minAppearances }
              }
            },
            { $project: {
                  //playerId: "$_id",
                  averageMark: { $round: [{ $divide: ["$totalMarks", "$appearanceCount"] }, 2] }
                }
            }
          ]).toArray();

        const collection_name = `PlayersAtLeast_${minAppearances}`;
        // Check if the collection exists
        const collections = await database.listCollections({ name: collection_name }).toArray();

        // If the collection exists, drop it
        if (collections.length > 0) {
            await database.collection(collection_name).drop();
            console.log(`Collection ${collection_name} dropped.`);
        }
    
        const collection_player_at_least = database.collection(collection_name);

        for(let i=0; i<result.length; i++){

            const player_to_add = await collection_player.findOne({_id : result[i]._id});

            await collection_player_at_least.insertOne(player_to_add);

            collection_player_at_least.updateOne(
                { _id: result[i]._id },
                { $set: { mark: result[i].averageMark } }
            );
        }
    }
    catch (error) {
        console.error("Error occurred while inserting data:", error);
    }
    finally{
        await client.close();
    }
}

findPlayersWithMinMatches(1)