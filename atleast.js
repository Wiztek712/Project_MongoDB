const connect = require('./connection');

async function atLeastCollection(listIdSelectedPlayers){

    const [client, database, collection_player, collection_team, collection_match] = await connect();

    const collection_player_at_least = database.collection("PlayersAtLeast");
    
    for(let i=0; i<listIdSelectedPlayers.length; i++){

        const player_to_add = await collection_player.findOne({_id : listIdSelectedPlayers[i]._id});

        await collection_player.insertOne(player_to_add);

        collection_player_at_least.updateOne(
            { _id: listIdSelectedPlayers[i]._id },
            { $set: { mark: listIdSelectedPlayers[i].averageMark } }
        );
    }
}