import { StyleSheet } from 'react-native';

const selectBoxButtonStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 34,
    borderRadius: 17,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    marginLeft: 10,
  },
  arrowContainer: {
    marginLeft: 5,
    marginTop: 10,
  },
});

export default selectBoxButtonStyles;
