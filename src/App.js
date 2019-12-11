import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Linking
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [permissions, setPermissions] = useState(false);

  const getPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CONTACTS);
    setPermissions(true);
  };

  const showContacts = async () => {
    const contactsList = await Contacts.getContactsAsync();
    setContacts(contactsList.data);
  };

  const email = contact => {
    let contactEmail = contact.email[0].replace(/[\(\)\-\s+]/g, '');
    let link = `mailto:${contactEmail}`;
    Linking.canOpenURL(link)
      .then(isSupported => Linking.openURL(link))
      .catch(console.error);
  };

  useEffect(() => {
    getPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Messaging App</Text>
      <Button title="Get Contacts" onPress={showContacts} />
      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Button title={item.name} onPress={() => email(item)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#676767',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100
  }
});
