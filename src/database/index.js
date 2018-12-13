import { SQLite } from 'expo';
import {
  CreateUserTable,
  CreateGameTable,
  CreatePlayerTable,
  CreateScoreTable,
  // CreatePlayerScoreTable,
  CreatePlayerGameTable,
  InsertDefaultUserRecord,
  InserDefaultGameRecord,
  InserDefaultPlayerRecord,
  InsertFirstScoreRecord,
  InsertSecondScoreRecord,
  InsertThirdScoreRecord,
  InsertFourthScoreRecord,
  InsertFifthScoreRecord,
  InsertSixthScoreRecord,
  InsertSeventhScoreRecord,
  InsertEighthScoreRecord
} from '../SQLiteScripts/CreateDatabase';

export default createDatabase = (connection) => {
  // Create the local database if it does not exist
  connection.transaction(trans => {

  // trans.executeSql('DROP TABLE IF EXISTS Game;', [], (_, { rows }) => console.log('Game Table Dropped'));

  // trans.executeSql('DROP TABLE IF EXISTS User;', [], (_, { rows }) => console.log('User Table Dropped'));

  // trans.executeSql('DROP TABLE IF EXISTS Player;', [], (_, { rows }) => console.log('Player Table Dropped'));

  // trans.executeSql('DROP TABLE IF EXISTS Score;', [], (_, { rows }) => console.log('Score Table Dropped'));

  // trans.executeSql('DROP TABLE IF EXISTS PlayerScore;', [], (_, { rows }) => console.log('PlayerScore Table Dropped'));

  // trans.executeSql('DROP TABLE IF EXISTS PlayerGame;', [], (_, {
  //   rows
  // }) => console.log('PlayerGame Table Dropped'));

  trans.executeSql(CreateUserTable);
  trans.executeSql(CreateGameTable);
  trans.executeSql(CreatePlayerTable);
  trans.executeSql(CreateScoreTable);
  // trans.executeSql(CreatePlayerScoreTable);
  trans.executeSql(CreatePlayerGameTable);
  trans.executeSql(InsertDefaultUserRecord);

  // trans.executeSql(InserDefaultGameRecord, (_, {
  //     rows
  //   }) =>
  //   console.log({
  //     rows
  //   }));

  // trans.executeSql(InserDefaultPlayerRecord, (_, {
  //     rows
  //   }) =>
  //   console.log({
  //     rows
  //   }));

  trans.executeSql(InsertFirstScoreRecord);
  trans.executeSql(InsertSecondScoreRecord);
  trans.executeSql(InsertThirdScoreRecord);
  trans.executeSql(InsertFourthScoreRecord);
  trans.executeSql(InsertFifthScoreRecord);
  trans.executeSql(InsertSixthScoreRecord);
  trans.executeSql(InsertSeventhScoreRecord);
  trans.executeSql(InsertEighthScoreRecord);

  // ORDER: SQL statement (1 at a time), arguments (use ? as placeholder), rows inserted
  // trans.executeSql('SELECT * FROM User WHERE UserID = 1;', [], (_, {
  //     rows
  //   }) =>
  //   console.log('USER', rows._array[0]));


  // trans.executeSql('SELECT * FROM Game;', [], (_, {
  //     rows
  //   }) =>
  //   console.log('GAME', rows)
  // );

  // trans.executeSql('SELECT * FROM Player;', [], (_, {
  //     rows
  //   }) =>
  //   console.log('Player', rows)
  // );

  // trans.executeSql('SELECT * FROM Score;', [], (_, {
  //     rows
  //   }) =>
  //   console.log('Score', rows)
  // );

  }, (err) => console.log({
    err
  }));
}