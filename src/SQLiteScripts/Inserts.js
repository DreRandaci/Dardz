const InsertIntoGame = `
INSERT INTO Game(GameID, UserID)
SELECT NULL, 1`;

const InsertIntoPlayer = `
INSERT INTO Player (PlayerID, PlayerName, IsUser)
SELECT NULL, ?, ?`;

const InsertIntoPlayerGame = `
INSERT INTO PlayerGame (PlayerGameID, PlayerID, GameID, ScoreID)
SELECT NULL, ?, ?, ?`;

export {
  InsertIntoGame,
  InsertIntoPlayer,
  InsertIntoPlayerGame
}