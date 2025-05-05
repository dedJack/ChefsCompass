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
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');

  const handleCreateRecipe = async () => {
    if (title && description && ingredients && steps) {
      onSubmit({title, description, difficulty, ingredients, steps});
      setTitle('');
      setDescription('');
      setDifficulty('Easy');
      setIngredients('');
      setSteps('');
      onCancle();
    } else {
      Alert.alert('Invalid input', 'Please fill all the forms.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.header}>🍽️ Create New Recipe</Text>
  
    {/* Optional Image Picker
    <TouchableOpacity style={styles.imageUpload}>
      <Text style={styles.imageUploadText}>+ Add Image</Text>
    </TouchableOpacity> */}
  
    <TextInput
      placeholder="Recipe Title"
      value={title}
      onChangeText={setTitle}
      style={styles.input}
      placeholderTextColor="#888"
    />
    <TextInput
      placeholder="Short Description..."
      value={description}
      onChangeText={setDescription}
      multiline={true}
      style={[styles.input, styles.textArea]}
      placeholderTextColor="#888"
    />
  
    <Picker
      style={styles.pickerContainer}
      selectedValue={difficulty}
      onValueChange={itemValue =>
        setDifficulty(itemValue as 'Easy' | 'Medium' | 'Hard')
      }>
      <Picker.Item label="Easy" value="Easy" />
      <Picker.Item label="Medium" value="Medium" />
      <Picker.Item label="Hard" value="Hard" />
    </Picker>
  
    <TextInput
      placeholder="Ingredients (comma-separated)"
      value={ingredients}
      onChangeText={setIngredients}
      multiline={true}
      style={[styles.input, styles.textArea]}
      placeholderTextColor="#888"
    />
    <TextInput
      placeholder="Steps to Cook"
      value={steps}
      onChangeText={setSteps}
      multiline={true}
      style={[styles.input, styles.textArea]}
      placeholderTextColor="#888"
    />
  
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.cancelBtn} onPress={onCancle}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitBtn} onPress={handleCreateRecipe}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
  
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'rgb(2, 79, 107)',
      borderRadius: 16,
      margin: 16,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
    },
    header: {
      fontSize: 28,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 20,
      color: 'white',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 12,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      marginBottom: 15,
      backgroundColor: '#f9f9f9',
      color: '#333',
    },
    textArea: {
      minHeight: 80,
      textAlignVertical: 'top',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 15,
      marginBottom: 15,
      backgroundColor: '#f9f9f9',
    },
    btnContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    cancelBtn: {
      flex: 1,
      backgroundColor: '#eee',
      paddingVertical: 12,
      marginRight: 10,
      borderRadius: 12,
    },
    submitBtn: {
      flex: 1,
      backgroundColor: '#333',
      paddingVertical: 12,
      marginLeft: 10,
      borderRadius: 12,
    },
    cancelText: {
      color: '#333',
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
    submitText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      textAlign: 'center',
    },
    imageUpload: {
      height: 160,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#ccc',
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: '#fafafa',
    },
    imageUploadText: {
      color: '#999',
      fontSize: 16,
    },
  
});

export default CreateRecipeForm;
