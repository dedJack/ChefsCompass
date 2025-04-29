import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreenTypeProp} from '../navigation/RootNavigation';
import CreateRecipeForm from '../components/CreateRecipeForm';
import {Recipe, RecipeContext} from '../context/RecipeContext';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackScreenTypeProp,
  'HomeScreen'
>;

interface HomeScreenProp {
  navigation: HomeScreenNavigationProp;
}
const HomeScreen: React.FC<HomeScreenProp> = ({navigation}) => {
  const {signOut} = useContext(AuthContext);
  const {createRecipe} = useContext(RecipeContext)

  const [searchRecipe, setSearchRecipe] = useState('');
  const [showModel, setShowModel] = useState(false);

  const handleCreateRecipeSubmit = async (
    new_recipe: Omit<Recipe, '_id' | 'createdAt' | 'createdBy'>,
  ) => {
    createRecipe(new_recipe);
  };
  const handleLogout = () => {
    console.log('logout listening');
    Alert.alert('Logout', 'Do you want to logout', [
      {
        text: 'Cancle',
        style: 'cancel',
      },
      {
        text: 'logout',
        onPress: async () => {
          await signOut();
          navigation.navigate('Login');
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchText}
          placeholder="Search recipes...."
          value={searchRecipe}
          onChangeText={setSearchRecipe}
        />
        <TouchableOpacity style={styles.addMenu}>
          <Text
            style={styles.addMenuText}
            onPress={() => {
              setShowModel(!showModel);
            }}>
            +
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleLogout}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModel}
          onRequestClose={() => setShowModel(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CreateRecipeForm
                onCancle={() => {
                  setShowModel(false);
                }}
                onSubmit={handleCreateRecipeSubmit}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 45,
    backgroundColor: 'blue',
  },
  header: {
    flexDirection: 'row',
    marginVertical: 15,
    marginHorizontal: 8,
    // justifyContent: 'center',
  },
  searchText: {
    flex: 1,
    fontSize: 15,
    borderWidth: 0.5,
    borderRadius: 50,
    paddingTop: 18,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  addMenu: {
    borderWidth: 0.5,
    borderRadius: 50,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  addMenuText: {
    fontSize: 20,
  },
  btn: {
    backgroundColor: 'black',
    borderWidth: 0.5,
    borderRadius: 50,
    paddingHorizontal: 18,
    justifyContent: 'center',
    // marginHorizontal: 5,
  },
  btnText: {
    fontSize: 12,
    color: 'whitesmoke',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(32, 30, 30, 0.38)',
    justifyContent: 'center',
  },
  modalContent: {
    marginHorizontal: 15,
  },
});
export default HomeScreen;
