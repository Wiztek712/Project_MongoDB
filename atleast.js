const connect = require('./connection');

async function findPlayersWithMinMatches(minAppearences) {
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
                appearanceCount: { $gte: minAppearences }
              }
            },
            { $project: {
                  //playerId: "$_id",
                  averageMark: { $round: [{ $divide: ["$totalMarks", "$appearanceCount"] }, 2] }
                }
            }
          ]).toArray();

        const collection_player_at_least = database.collection("PlayersAtLeast");
    
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

findPlayersWithMinMatches(2)
