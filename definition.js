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
      { firstName: "Hugo", lastName: "Lloris", birthDate: "26.12.1986", height: 188, weight: 85, position: "gardien" },
      { firstName: "Olivier", lastName: "Giroud", birthDate: "30.09.1986", height: 193, weight: 84, position: "attaquant" },
      { firstName: "Kylian", lastName: "Mbappe", birthDate: "20.12.1998", height: 178, weight: 77, position: "attaquant" },
      { firstName: "Antoine", lastName: "Griezmann", birthDate: "21.03.1991", height: 175, weight: 75, position: "attaquant" },
      { firstName: "Blaise", lastName: "Matuidi", birthDate: "09.04.1987", height: 180, weight: 78, position: "attaquant" },
      { firstName: "Paul", lastName: "Pogba", birthDate: "15.03.1993", height: 191, weight: 84, position: "milieu" },
      { firstName: "Ngolo", lastName: "Kante", birthDate: "29.03.1991", height: 168, weight: 73, position: "milieu" },
      { firstName: "Raphael", lastName: "Varane", birthDate: "25.04.1993", height: 191, weight: 83, position: "defenseur" },
      { firstName: "Samuel", lastName: "Umtiti", birthDate: "14.11.1993", height: 182, weight: 78, position: "defenseur" },
      { firstName: "Lucas", lastName: "Hernandez", birthDate: "14.02.1996", height: 184, weight: 81, position: "defenseur" },
      { firstName: "Benjamin", lastName: "Pavard", birthDate: "28.03.1996", height: 186, weight: 83, position: "defenseur" },

      // Belgium
      { firstName: "Thibaut", lastName: "Courtois", birthDate: "11.05.1992", height: 199, weight: 96, position: "gardien" },
      { firstName: "Toby", lastName: "Alderweireld", birthDate: "02.03.1989", height: 187, weight: 91, position: "defenseur" },
      { firstName: "Jan", lastName: "Vertonghen", birthDate: "24.04.1987", height: 189, weight: 87, position: "defenseur" },
      { firstName: "Thomas", lastName: "Meunier", birthDate: "12.09.1991", height: 191, weight: 84, position: "defenseur" },
      { firstName: "Axel", lastName: "Witsel", birthDate: "12.01.1989", height: 186, weight: 81, position: "milieu" },
      { firstName: "Kevin", lastName: "De Bruyne", birthDate: "28.06.1991", height: 181, weight: 70, position: "milieu" },
      { firstName: "Youri", lastName: "Tielemans", birthDate: "07.05.1997", height: 176, weight: 72, position: "milieu" },
      { firstName: "Eden", lastName: "Hazard", birthDate: "07.01.1991", height: 175, weight: 74, position: "attaquant" },
      { firstName: "Romelu", lastName: "Lukaku", birthDate: "13.05.1993", height: 191, weight: 94, position: "attaquant" },
      { firstName: "Dries", lastName: "Mertens", birthDate: "06.05.1987", height: 169, weight: 61, position: "attaquant" },
      { firstName: "Yannick", lastName: "Carrasco", birthDate: "04.09.1993", height: 181, weight: 73, position: "milieu" },

      // England
      { firstName: "Jordan", lastName: "Pickford", birthDate: "07.03.1994", height: 185, weight: 77, position: "gardien" },
      { firstName: "Kyle", lastName: "Walker", birthDate: "28.05.1990", height: 183, weight: 80, position: "defenseur" },
      { firstName: "John", lastName: "Stones", birthDate: "28.05.1994", height: 188, weight: 77, position: "defenseur" },
      { firstName: "Harry", lastName: "Maguire", birthDate: "05.03.1993", height: 194, weight: 100, position: "defenseur" },
      { firstName: "Luke", lastName: "Shaw", birthDate: "12.07.1995", height: 185, weight: 75, position: "defenseur" },
      { firstName: "Declan", lastName: "Rice", birthDate: "14.01.1999", height: 185, weight: 80, position: "milieu" },
      { firstName: "Jude", lastName: "Bellingham", birthDate: "29.06.2003", height: 186, weight: 75, position: "milieu" },
      { firstName: "Jordan", lastName: "Henderson", birthDate: "17.06.1990", height: 187, weight: 80, position: "milieu" },
      { firstName: "Raheem", lastName: "Sterling", birthDate: "08.12.1994", height: 170, weight: 69, position: "attaquant" },
      { firstName: "Harry", lastName: "Kane", birthDate: "28.07.1993", height: 188, weight: 86, position: "attaquant" },
      { firstName: "Bukayo", lastName: "Saka", birthDate: "05.09.2001", height: 178, weight: 73, position: "attaquant" },

      // Argentina
      { firstName: "Emiliano", lastName: "Martinez", birthDate: "02.09.1992", height: 195, weight: 88, position: "gardien" },
      { firstName: "Nahuel", lastName: "Molina", birthDate: "06.04.1998", height: 175, weight: 70, position: "defenseur" },
      { firstName: "Cristian", lastName: "Romero", birthDate: "27.04.1998", height: 185, weight: 79, position: "defenseur" },
      { firstName: "Nicolas", lastName: "Otamendi", birthDate: "12.02.1988", height: 183, weight: 81, position: "defenseur" },
      { firstName: "Marcos", lastName: "Acuna", birthDate: "28.10.1991", height: 172, weight: 72, position: "defenseur" },
      { firstName: "Rodrigo", lastName: "De Paul", birthDate: "24.05.1994", height: 180, weight: 70, position: "milieu" },
      { firstName: "Leandro", lastName: "Paredes", birthDate: "29.06.1994", height: 180, weight: 75, position: "milieu" },
      { firstName: "Alexis", lastName: "Mac Allister", birthDate: "24.12.1998", height: 174, weight: 72, position: "milieu" },
      { firstName: "Lionel", lastName: "Messi", birthDate: "24.06.1987", height: 170, weight: 72, position: "attaquant" },
      { firstName: "Julian", lastName: "Alvarez", birthDate: "31.01.2000", height: 170, weight: 71, position: "attaquant" },
      { firstName: "Angel", lastName: "Di Maria", birthDate: "14.02.1988", height: 180, weight: 75, position: "attaquant" }
    ];

    // Insert all players using insertMany
    const result = await collection_player.insertMany(players);

    console.log(`${result.insertedCount} players were inserted successfully.`);
  } catch (error) {
    console.error("Error occurred while inserting players:", error);

  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
