const InsertIntoGame = `
INSERT INTO Game(GameID, NumberOfPlayers)
SELECT NULL, ?`;

const InsertIntoPlayer = `
INSERT INTO Player (PlayerID, PlayerName, IsUser)
SELECT ?, ?, ?`;

const InsertIntoPlayerGame = `
INSERT INTO PlayerGame (PlayerGameID, PlayerID, GameID, ScoreID, PlayerScore)
SELECT NULL, ?, ?, ?, ?`;

export {
  InsertIntoGame,
  InsertIntoPlayer,
  InsertIntoPlayerGame
}