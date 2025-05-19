import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const TaskItem = ({ task, toggleCompletion, deleteTask }) => (
  <View style={styles.taskRow}>
    <TouchableOpacity
      style={styles.textWrapper}
      onPress={() => toggleCompletion(task.id)}
    >
      <Text style={[styles.taskTitle, task.completed && styles.completed]}>
        {task.title}
      </Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <Text style={styles.taskDueDate}>Due: {task.dueDate}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => deleteTask(task.id)}>
      <Text style={styles.deleteIcon}>🗑️</Text>
    </TouchableOpacity>
  </View>
);

const TaskList = ({ tasks, toggleCompletion, deleteTask }) => {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          toggleCompletion={toggleCompletion}
          deleteTask={deleteTask}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    marginHorizontal: 2,
    elevation: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textWrapper: {
    flex: 1,
    paddingRight: 10,
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  taskDueDate: {
    fontSize: 12,
    color: "#aaa",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  deleteIcon: {
    fontSize: 18,
    color: "red",
  },
});

export default TaskList;
