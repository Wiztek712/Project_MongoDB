// Here are the function as to insert a player, a team or a match in the database.

const connect = require('./connection');
const { ObjectId } = require('mongodb');
const readline = require('readline');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function randomMark() {
    let randomNumber = Math.random() * 5;
    return Math.round(randomNumber * 10) / 10;
}

// ---------------------------------------Insert a player

async function insertPlayer(firstName, lastName, birthDate, height, weight, position, team){
    const [client, database, collection_player, collection_team, collection_match] = await connect();
    try {
        // Find the team ID by its name
        const team_data = await collection_team.findOne({ team_name: team }, { _id: 1 });
        
        if (!team_data) {
            throw new Error(`Team ${team} not found`);
        }
        const result = await collection_player.updateOne(
            { firstName: firstName, lastName: lastName },  // Search by first name and last name
            {
                $set: {
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: new Date(birthDate),  // Ensure the birthDate is stored as a Date object
                    height: height,
                    weight: weight,
                    position: position,
                    teamId: team_data._id  // Link to the found team's _id
                }
            },
            { upsert: true }  // Insert if no matching document is found
        );
        if (result.upsertedCount > 0) {
            console.log(`New player inserted with id: ${result.upsertedId._id}`);
        } else {
            console.log(`Player updated successfully`);
        }
    }
    catch (error) {
        console.error("Error occurred while inserting data:", error);
    }
    finally{
        await client.close();
    }
}

// ---------------------------------------Insert a team
async function insertTeam(team_name, colors, stadium, players) {
    if (players.length !== 11) {
        throw new Error("Exactly 11 players must be provided.");
    }

    const [client, database, collection_player, collection_team, collection_match] = await connect();

    try {
        // Check if the team already exists
        const existingTeam = await collection_team.findOne({ team_name: team_name });

        if (existingTeam) {
            throw new Error(`Team ${team_name} already exists with ID: ${existingTeam._id}`);
        }

        // Insert the team
        const teamId = new ObjectId();  // Generate a new team ID

        const teamData = {
            _id: teamId,
            team_name: team_name,
            colors: colors,
            stadium: stadium,
            players: []
        };

        const teamResult = await collection_team.insertOne(teamData);
        console.log(`Team inserted with id: ${teamResult.insertedId}`);

        // Iterate over the players to handle each one
        for (const player of players) {
            let { firstName, lastName, birthDate, height, weight, position } = player;

            // Check if the player already exists in the database
            let existingPlayer = await collection_player.findOne({ firstName: firstName, lastName: lastName });

            if (!existingPlayer) {
                console.log(`Player ${firstName} ${lastName} not found. Please provide additional info.`);

                // Prompt the user for missing details
                if (!birthDate) birthDate = await askQuestion(`Enter birth date for ${firstName} ${lastName} (YYYY-MM-DD): `);
                if (!height) height = await askQuestion(`Enter height for ${firstName} ${lastName} (in cm): `);
                if (!weight) weight = await askQuestion(`Enter weight for ${firstName} ${lastName} (in kg): `);
                if (!position) position = await askQuestion(`Enter position for ${firstName} ${lastName}: `);

                // Insert the player with the collected information
                const newPlayer = {
                    firstName: firstName,
                    lastName: lastName,
                    birthDate: new Date(birthDate),
                    height: parseInt(height),  // Convert height to integer
                    weight: parseInt(weight),  // Convert weight to integer
                    position: position,
                    teamId: teamId
                };

                const playerInsertResult = await collection_player.insertOne(newPlayer);
                console.log(`New player inserted with id: ${playerInsertResult.insertedId}`);

                // Push the new player's ID into the team's players list
                teamData.players.push(playerInsertResult.insertedId);
            } else {
                // If the player exists, just update their teamId
                await collection_player.updateOne(
                    { _id: existingPlayer._id },
                    { $set: { teamId: teamId } }
                );

                console.log(`Player ${existingPlayer.firstName} ${existingPlayer.lastName} updated with new team ID: ${teamId}`);

                // Push the existing player's ID into the team's players list
                teamData.players.push(existingPlayer._id);
            }
        }

        // Update the team's players array with the correct IDs
        await collection_team.updateOne(
            { _id: teamId },
            { $set: { players: teamData.players } }
        );

        console.log(`Team ${team_name} updated with player IDs.`);
    } catch (error) {
        console.error("Error occurred while inserting/updating team and players:", error);
    } finally {
        await client.close();  // Ensure the MongoDB connection is closed
    }
}

// ---------------------------------------Insert a match

async function insertMatch(homeTeamName, awayTeamName, competition, homeTeamScore, awayTeamScore) {
    const [client, database, collection_player, collection_team, collection_match] = await connect();

    try {
        // Find home team by name
        const homeTeam = await collection_team.findOne({ team_name: homeTeamName });
        if (!homeTeam) {
            throw new Error(`Home team ${homeTeamName} not found.`);
        }

        // Find away team by name
        const awayTeam = await collection_team.findOne({ team_name: awayTeamName });
        if (!awayTeam) {
            throw new Error(`Away team ${awayTeamName} not found.`);
        }

        // Get home team players and assign random marks
        const homePlayers = await collection_player.find({ teamId: homeTeam._id }).toArray();
        const homePlayerMarks = homePlayers.map(player => ({
            playerId: player._id,
            mark: randomMark()
        }));

        // Get away team players and assign random marks
        const awayPlayers = await collection_player.find({ teamId: awayTeam._id }).toArray();
        const awayPlayerMarks = awayPlayers.map(player => ({
            playerId: player._id,
            mark: randomMark()
        }));

        // Insert match data into the Matches collection
        const matchId = new ObjectId();  // Generate a new match ID

        const matchData = {
            _id: matchId,
            home_team_name: homeTeam._id,
            away_team_name: awayTeam._id,
            competition: competition,
            home_team_score: homeTeamScore,
            away_team_score: awayTeamScore,
            home_team_players: homePlayerMarks,
            away_team_players: awayPlayerMarks
        };

        const result = await collection_match.insertOne(matchData);

    } catch (error) {
        console.error("Error occurred while inserting match data:", error);
    } finally {
        await client.close();
    }
}

module.exports = {insertMatch, insertPlayer, insertTeam};