import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json({ message: "New task created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create a new task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ message: "All tasks fetched successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch all tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "The task has been fetched successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch this task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update the task" });
  }
};

export const deleteTask = async (req,res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({message: "Failed to delete the task"})
  }
}