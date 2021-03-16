import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {
  StyleService,
  useStyleSheet,
  Layout,
  Text,
  Card,
  Icon,
} from '@ui-kitten/components';
import styleSheet from '../../styles/styles';

const ArrowIcon = (props) => (
  <Icon {...props} fill="#8F9BB3" name="chevron-right" />
);
const BellIcon = (props) => <Icon {...props} fill="#118AB2" name="bell" />;

const Notifications = (props) => {
  const styles = useStyleSheet(styleSheet);
  const notiStyles = useStyleSheet(notiStyleSheet);

  return (
    <Layout style={styles.upper}>
      <Card {...props} style={{...notiStyles.notiCard, ...props.style}}>
        <View style={{...styles.row, ...notiStyles.cardBody}}>
          <BellIcon style={{...notiStyles.icon, ...props.iconSize}} />
          <Text category="s1" style={styles.textBlack}>
            You have {props.num} new notifications
          </Text>
          {!props.disabled && <ArrowIcon style={notiStyles.icon} />}
        </View>
      </Card>
    </Layout>
  );
};

const notiStyleSheet = StyleService.create({
  notiCard: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '90%',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  cardBody: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '80%',
    width: '100%',
  },
  icon: {
    height: 40,
    width: 40,
  },
});

export default Notifications;
