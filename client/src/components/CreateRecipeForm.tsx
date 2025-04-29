import {Picker} from '@react-native-picker/picker';
import React, {useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Recipe} from '../context/RecipeContext';

interface CreateRecipeFormProps {
  onCancle: () => void;
  onSubmit: (
    recipe: Omit<Recipe, '_id' | 'createdAt' | 'createdBy'>,
  ) => Promise<void>;
}
const CreateRecipeForm: React.FC<CreateRecipeFormProps> = ({
  onCancle,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>(
    'Easy',
  );

  const handleCreateRecipe = async () => {
    if (title && description) {
      onSubmit({title, description, difficulty});
      setTitle('');
      setDescription('');
      setDifficulty('Easy');
      onCancle();
    } else {
      Alert.alert('Invalid input', 'Please fill all the forms.');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={[
          {
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
            marginVertical: 10,
          },
        ]}>
        Create new Recipe
      </Text>
      <TextInput
        placeholder="Recipe title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Recipe description..."
        value={description}
        onChangeText={setDescription}
        multiline={true}
        style={[styles.input, styles.inputDescription]}
      />
      <Picker
        style={styles.pickerContainer}
        selectedValue={difficulty}
        onValueChange={itemValue => {
          setDifficulty(itemValue as 'Easy' | 'Medium' | 'Hard');
        }}>
        <Picker.Item label="Easy" value={'Easy'} />
        <Picker.Item label="Medium" value={'Medium'} />
        <Picker.Item label="Hard" value={'Hard'} />
      </Picker>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'lightgrey'}]}
          onPress={onCancle}>
          <Text style={styles.btnText}>cancle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'black'}]}
          onPress={handleCreateRecipe}>
          <Text style={[styles.btnText, {color: 'white'}]}>submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
  },
  input: {
    fontSize: 15,
    borderWidth: 0.5,
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  inputDescription: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    marginHorizontal: 13,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 15,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CreateRecipeForm;
