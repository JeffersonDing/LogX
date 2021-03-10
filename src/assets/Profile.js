import React, {useContext, useState} from 'react';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {
  Button,
  Layout,
  Text,
  Avatar,
  StyleService,
  useStyleSheet,
  Icon,
  Card,
  Input,
} from '@ui-kitten/components';
import styles from '../styles/styles';
import {AuthContext} from '../../navigation/AuthProvider';
import {ref} from '../helpers/RealTimeDB';
import {ScrollView} from 'react-native-gesture-handler';

export const Profile = () => {
  const {user, logout, userData} = useContext(AuthContext);
  const profileStyles = useStyleSheet(profileStyleSheet);
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    first: userData.info.first,
    last: userData.info.last,
    state: userData.info.address.state,
    country: userData.info.address.country,
  });
  const EditIcon = (props) => <Icon {...props} fill="#8F9BB3" name="edit" />;
  const cardHeader = () => {
    return (
      <Text category="h4" style={profileStyles.header}>
        My Stats
      </Text>
    );
  };
  if (edit) {
    return (
      <ScrollView>
        <SafeAreaView style={styles.safeView}>
          <Layout>
            <View style={profileStyles.edit}>
              <TouchableOpacity
                onPress={() => {
                  ref.child(`users/${user.uid}/info`).update({
                    first: data.first,
                    last: data.last,
                    address: {
                      country: data.country,
                      state: data.state,
                    },
                  });
                  setEdit(!edit);
                }}>
                <EditIcon style={profileStyles.icon} />
              </TouchableOpacity>
            </View>
          </Layout>
          <Layout style={styles.upper}>
            <Avatar
              style={profileStyles.avatar}
              source={{uri: userData.info.photoURL}}
            />
            <Text style={profileStyles.cs}>{userData.info.cs}</Text>
            <Text>{user.email}</Text>
            <View style={styles.row}>
              <Input
                placeholder="First Name"
                value={data.first}
                placeholderColor="#c4c3cb"
                style={profileStyles.input}
                secureTextEntry={false}
                onChangeText={(nextValue) =>
                  setData({...data, first: nextValue})
                }
              />
              <Input
                placeholder="Last Name"
                value={data.last}
                placeholderColor="#c4c3cb"
                style={profileStyles.input}
                secureTextEntry={false}
                onChangeText={(nextValue) =>
                  setData({...data, last: nextValue})
                }
              />
            </View>

            <View style={styles.row}>
              <Input
                placeholder="State/Province"
                value={data.state}
                placeholderColor="#c4c3cb"
                style={profileStyles.input}
                secureTextEntry={false}
                onChangeText={(nextValue) =>
                  setData({...data, state: nextValue})
                }
              />
              <Input
                placeholder="Country"
                value={data.country}
                placeholderColor="#c4c3cb"
                style={profileStyles.input}
                secureTextEntry={false}
                onChangeText={(nextValue) =>
                  setData({...data, country: nextValue})
                }
              />
            </View>
            <Card style={profileStyles.card} header={cardHeader}>
              <View style={styles.row}>
                <Text category="h5">Contacts: </Text>
                <Text category="h5">
                  {Object.keys(userData.contacts).length}
                </Text>
              </View>
              <View style={styles.row}>
                <Text category="h5">Posts: </Text>
                <Text category="h5">{0}</Text>
              </View>
            </Card>
            <Button style={profileStyles.logoutButton} onPress={() => logout()}>
              Logout
            </Button>
          </Layout>
        </SafeAreaView>
      </ScrollView>
    );
  }
  return (
    <SafeAreaView style={styles.safeView}>
      <Layout>
        <View style={profileStyles.edit}>
          <TouchableOpacity
            onPress={() => {
              setEdit(!edit);
            }}>
            <EditIcon style={profileStyles.icon} />
          </TouchableOpacity>
        </View>
      </Layout>
      <Layout style={styles.upper}>
        <Avatar
          style={profileStyles.avatar}
          source={{uri: userData.info.photoURL}}
        />
        <Text style={profileStyles.cs}>{userData.info.cs}</Text>
        <Text>{user.email}</Text>
        <Text category="h1">{`${data.first} ${data.last}`}</Text>
        {data.state && data.country ? (
          <Text category="h5">{`${data.state},${data.country}`}</Text>
        ) : (
          <Text category="h5">{`Address Not Set`}</Text>
        )}
        <Card style={profileStyles.card} header={cardHeader}>
          <View style={styles.row}>
            <Text category="h5">Contacts: </Text>
            <Text category="h5">{Object.keys(userData.contacts).length}</Text>
          </View>
          <View style={styles.row}>
            <Text category="h5">Posts: </Text>
            <Text category="h5">{0}</Text>
          </View>
        </Card>
        <Button style={profileStyles.logoutButton} onPress={() => logout()}>
          Logout
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const profileStyleSheet = StyleService.create({
  avatar: {
    height: 120,
    width: 120,
    marginTop: 10,
  },
  cs: {
    fontSize: 55,
    marginTop: 10,
  },
  edit: {
    alignItems: 'flex-end',
  },
  icon: {
    height: 50,
    width: 50,
  },
  card: {
    margin: 2,
    marginBottom: 10,
    marginTop: 10,
    width: '95%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  stats: {
    marginTop: 20,
  },
  header: {
    color: 'black',
    marginLeft: 10,
  },
  logoutButton: {
    width: '90%',
    marginTop: 20,
    backgroundColor: 'color-danger-300',
    borderWidth: 0,
  },
  input: {
    width: 150,
  },
});
export default Profile;
