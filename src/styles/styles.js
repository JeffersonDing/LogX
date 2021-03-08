import {StyleService} from '@ui-kitten/components';
const styleSheet = StyleService.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
  safeView: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  col: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  scrollView: {
    height: '100%',
    width: '100%',
  },
});
export default styleSheet;
