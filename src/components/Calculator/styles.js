import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1
    },
    displayContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    displayTextRight: {
      color: '#fff',
      fontSize: 38,
      fontWeight: 'bold',
      paddingTop: 20,
      paddingRight: 20
    },
    displayTextLeft: {
      color: '#fff',
      fontSize: 26,
      fontWeight: 'bold',
      paddingLeft: 20,
      paddingTop: 20,
      maxWidth: 190
    },
    subtext: {
      fontSize: 20,
      lineHeight: 18,
      paddingLeft: 20,
      paddingTop: 10,
      color: '#fff'
    },
    inputContainer: {
      flex: 8,
      backgroundColor: '#000'
    },
    inputRow: {
      flex: 1,
      flexDirection: 'row'
    },
    inputButton: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.5,
      borderColor: '#444'
    },
    inputButtonHighlighted: {
      backgroundColor: '#193441'
    },
    inputButtonText: {
      fontSize: 34,
      fontWeight: 'bold',
      color: 'white',
    }
});

export default styles;