db.Players.find({
    birthDate: {
      $lt: {
        $dateSubtract: {
          startDate: "$$NOW",  // Actual date
          unit: "year",  // We will substract years
          amount: 25  // We substract 25 years
        }
      }
    }
  , position : "attaquant"})
