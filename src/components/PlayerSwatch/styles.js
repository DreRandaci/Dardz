import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 24,
    paddingRight: 20
  },
  backgroundImg: {
    paddingTop: 19,
    width: '100%',
    height: 65,
    marginBottom: 15,
    marginLeft: -30,
  },
  textDisplay: {
    paddingLeft: 68
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 5,
    fontSize: 25,
    maxWidth: 200
  },
  rightElementNum: {
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: -30,
    fontSize: 30
  },
  rightElement: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center'
  },
}));
