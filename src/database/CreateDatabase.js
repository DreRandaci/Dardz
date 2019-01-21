// Insert this variable as string interpolation if wanting to store JSON
const defaultGame = JSON.stringify({
  players: [{}]
});


/******************* Tables *******************/
/**********************************************/
const CreateUserTable = `
CREATE TABLE IF NOT EXISTS User
(
  UserID INTEGER PRIMARY KEY NOT NULL DEFAULT 1
  , IsFirstTimeUser INTEGER NOT NULL DEFAULT 1
  , UNIQUE(UserID)
);`;

const CreateGameTable = `
CREATE TABLE IF NOT EXISTS Game
(
  GameID INTEGER PRIMARY KEY NOT NULL
  , DateCreated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  , NumberOfPlayers INTEGER NOT NULL
  , UNIQUE(GameID)
);`;

const CreatePlayerTable = `
CREATE TABLE IF NOT EXISTS Player
(
  PlayerID INTEGER PRIMARY KEY NOT NULL
  , PlayerName TEXT NOT NULL
  , IsUser INTEGER NOT NULL DEFAULT 0
  , UNIQUE(PlayerID)
);`;

const CreateScoreTable = `
CREATE TABLE IF NOT EXISTS Score
(
  ScoreID INTEGER PRIMARY KEY NOT NULL
  , Place INTEGER NOT NULL
  , UNIQUE(ScoreID)
);`;

const CreatePlayerGameTable = `
CREATE TABLE IF NOT EXISTS PlayerGame
(
  PlayerGameID INTEGER PRIMARY KEY NOT NULL
  , PlayerID NOT NULL
  , GameID NOT NULL
  , ScoreID NOT NULL
  , PlayerScore INTEGER NOT NULL
  , FOREIGN KEY(PlayerID) REFERENCES Player(PlayerID)
  , FOREIGN KEY(GameID) REFERENCES Game(GameID)
  , FOREIGN KEY(ScoreID) REFERENCES Score(ScoreID)
  , UNIQUE(PlayerGameID)
);`;


/******************* Default Records *******************/
/*******************************************************/
const InsertDefaultUserRecord = `
INSERT INTO User (UserID)
SELECT NULL
WHERE NOT EXISTS (SELECT 1 FROM User WHERE UserID = 1);
`;

const InserDefaultGameRecord = `
INSERT INTO Game (GameID, NumberOfPlayers)
SELECT NULL, 6
WHERE NOT EXISTS (SELECT 1 FROM Game WHERE GameID = 1);
`;

// const InserDefaultPlayerRecord = `
// INSERT INTO Player (PlayerID, PlayerName, GameID)
// SELECT NULL, 'TEST', 1
// WHERE NOT EXISTS (SELECT 1 FROM Player WHERE PlayerID = 1);
// `;

const InsertFirstScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 1
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 1);
`;
const InsertSecondScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 2
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 2);
`;
const InsertThirdScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 3
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 3);
`;
const InsertFourthScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 4
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 4);
`;
const InsertFifthScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 5
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 5);
`;
const InsertSixthScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 6
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 6);
`;
const InsertSeventhScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 7
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 7);
`;
const InsertEighthScoreRecord = `
INSERT INTO Score (ScoreID, Place)
SELECT NULL, 8
WHERE NOT EXISTS (SELECT 1 FROM SCORE WHERE Place = 8);
`;

export {
  CreateUserTable,
  CreateGameTable,
  CreatePlayerTable,
  CreateScoreTable,
  CreatePlayerGameTable,
  InsertDefaultUserRecord,
  InserDefaultGameRecord,
  // InserDefaultPlayerRecord,
  InsertFirstScoreRecord,
  InsertSecondScoreRecord,
  InsertThirdScoreRecord,
  InsertFourthScoreRecord,
  InsertFifthScoreRecord,
  InsertSixthScoreRecord,
  InsertSeventhScoreRecord,
  InsertEighthScoreRecord
};
