import { StyleSheet } from 'react-native';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 60,
    height: 100
  },
  logoImg: {
    flex: 1,
    width: 220,
    height: undefined
  },
  playersContainer: {
    marginTop: 20,
    width: '100%',
    marginBottom: 100
  },
  logoInOverlay: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoImgInOverlay: {
    flex: 1,
    width: 100,
    height: 100
  }
}));
