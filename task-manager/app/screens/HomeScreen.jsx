import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../components/TaskList";

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [incompleteOnly, setIncompleteOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addTask = () => {
    if (title.trim()) {
      const newTask = {
        id: uuidv4(),
        title,
        description,
        dueDate,
        completed: false,
      };
      setTasks((prev) => [...prev, newTask]);
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  const toggleCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((task) => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date (YYYY-MM-DD)"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <Button title="Add Task" onPress={addTask} />
      </View>

      <View style={styles.switchRow}>
        <Text>Show Incomplete Only</Text>
        <Switch
          value={incompleteOnly}
          onValueChange={() => setIncompleteOnly((prev) => !prev)}
        />
      </View>

      <Text style={styles.progressText}>Progress: {calculateProgress()}%</Text>

      <TaskList
        tasks={incompleteOnly ? tasks.filter((t) => !t.completed) : tasks}
        toggleCompletion={toggleCompletion}
        deleteTask={deleteTask}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f3f3f3",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  form: {
    marginBottom: 16,
    gap: 8,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "white",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  progressText: {
    marginBottom: 8,
    fontWeight: "500",
    color: "#555",
  },
});

export default HomeScreen;
