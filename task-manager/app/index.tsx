import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import uuid from "react-native-uuid";
import TaskList from "./components/TaskList";

type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [incompleteOnly, setIncompleteOnly] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const addTask = () => {
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Please enter a title and description.");
      return;
    }

    const newTask = {
      id: uuid.v4() as string,
      title,
      description,
      dueDate: dueDate.toISOString().split("T")[0],
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);

    // Reset inputs and error message
    setTitle("");
    setDescription("");
    setDueDate(new Date());
    setErrorMessage("");
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

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Task Manager</Text>

      <View style={styles.inputGroup}>
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
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dueDateButton}>
            Pick Due Date ({dueDate.toDateString()})
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onChangeDate}
          />
        )}
        <Button title="Add Task" onPress={addTask} />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.label}>Show Incomplete Only</Text>
        <Switch
          value={incompleteOnly}
          onValueChange={() => setIncompleteOnly((prev) => !prev)}
        />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBarWrapper}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${calculateProgress()}%` },
            ]}
          />
        </View>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressTextLeft}>
            Progress: {calculateProgress()}%
          </Text>
          <Text style={styles.progressTextRight}>
            {calculateProgress()}% Complete
          </Text>
        </View>
      </View>

      <View style={styles.taskListContainer}>
        <TaskList
          tasks={
            incompleteOnly ? tasks.filter((task) => !task.completed) : tasks
          }
          toggleCompletion={toggleCompletion}
          deleteTask={deleteTask}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24, // ← more room on sides
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#FFF0F6",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#FF69B4", // hot pink
  },
  inputGroup: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 16,
    shadowColor: "#FFB6C1",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 24,
    gap: 12,
  },
  input: {
    borderColor: "#FFC0CB",
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#FFF8FB",
  },
  dueDateButton: {
    color: "#FF69B4",
    fontWeight: "600",
    fontSize: 15,
    textAlign: "left",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 16, // <-- fixes edge crowding
  },

  progressBarWrapper: {
    height: 12,
    backgroundColor: "#FFDDEE",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 6,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF69B4",
    borderRadius: 6,
  },

  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  progressTextLeft: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
  },

  progressTextRight: {
    fontSize: 14,
    fontWeight: "500",
    color: "#888",
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 10,
  },

  label: {
    fontSize: 15,
    color: "#333",
  },

  taskListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  errorText: {
    color: "#D2042D",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
