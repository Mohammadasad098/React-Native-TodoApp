import { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, View, Modal, Pressable, Alert } from "react-native";

export default function Index() {
  const [input, setInput] = useState('');
  const [todo, setTodo] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const addTodo = () => {
    if (!input.trim()) {
      Alert.alert('Error', 'Please enter a todo!');
      return;
    }
    todo.push(input);
    setTodo([...todo]);
    setInput('');
  };

  const deleteTodo = (index: number) => {
    todo.splice(index, 1);
    setTodo([...todo]);
  };

  const openEditModal = (index: number) => {
    setSelectedIndex(index);
    setUpdateInput(todo[index]);
    setModalVisible(true);
  };

  const editTodo = () => {
    if (selectedIndex === null) return;
    if (!updateInput.trim()) {
      Alert.alert('Error', 'Please enter a valid todo!');
      return;
    }
    todo[selectedIndex] = updateInput;
    setTodo([...todo]);
    setModalVisible(false);
    setUpdateInput('');
    setSelectedIndex(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerText}>Todo App</Text>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        value={input}
        placeholder="Enter Todo"
      />
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>Add Todo</Text>
      </TouchableOpacity>

      {todo.length > 0 ? (
        <FlatList
          style={{ marginTop: 20 }}
          data={todo}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item}</Text>
              <TouchableOpacity style={styles.ListBtn} onPress={() => deleteTodo(index)}>
                <Text>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ListBtn} onPress={() => openEditModal(index)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noTodoText}>No Todo Found</Text>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update Todo</Text>
            <TextInput
              style={styles.updateInput}
              onChangeText={setUpdateInput}
              value={updateInput}
              placeholder="Updated Todo Value"
            />
            <View style={styles.modalButtons}>
              <Pressable style={[styles.modalBtn, styles.buttonSave]} onPress={editTodo}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
              <Pressable
                style={[styles.modalBtn, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginHorizontal: 110,
  },
  item: {
    backgroundColor: '#eb7d34',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  ListBtn: {
    alignItems: 'center',
    backgroundColor: '#f5ba93',
    padding: 10,
    margin: 5,
  },
  noTodoText: {
    fontSize: 22,
    color: 'black',
    margin: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 25,
    textAlign: 'center',
  },
  updateInput: {
    margin: 20,
    width: 220,
    borderWidth: 1,
    paddingLeft: 6
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
  },
  buttonSave: {
    backgroundColor: '#2196F3',
    paddingRight: 25,
    paddingLeft: 25
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    paddingRight: 20,
    paddingLeft: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
