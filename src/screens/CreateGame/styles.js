import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  logoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 60,
    height: 140
  },
  logoImg: {
    flex: 1,
    width: 220,
    height: undefined
  },
  playersContainer: {
    marginTop: 20,
    width: '100%'
  },
  inputContainer: {
    alignItems: 'center',
    marginLeft: 25,
    marginRight: 25,
  },
  buttonContainer: {
    marginTop: 20
  },
  addPlayersText: {
    marginTop: 50
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30
  }
}));
