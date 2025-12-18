import { useState, useEffect } from "react";

function App() {
  const [todoTasks, setTodoTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedTodo = JSON.parse(localStorage.getItem("todoTasks")) || [];
    const savedDone = JSON.parse(localStorage.getItem("doneTasks")) || [];
    setTodoTasks(savedTodo);
    setDoneTasks(savedDone);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
  }, [todoTasks, doneTasks]);

  const addTask = () => {
    const text = taskInput.trim();
    if (!text) return;
    const newTask = { id: Date.now(), text };
    setTodoTasks([...todoTasks, newTask]);
    setTaskInput("");
  };

  const deleteTask = (id, done = false) => {
    if (done) setDoneTasks(doneTasks.filter(t => t.id !== id));
    else setTodoTasks(todoTasks.filter(t => t.id !== id));
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("taskId", id);
  };

  const handleDropToDone = (e) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("taskId"));
    const task = todoTasks.find(t => t.id === id);
    if (!task) return;
    setTodoTasks(todoTasks.filter(t => t.id !== id));
    setDoneTasks([...doneTasks, task]);
    setMessage("This still counts 💖");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="app">
      <h1>StillCounts</h1>
      <p className="subtitle">Even small efforts matter</p>
      <p className="description">
        StillCounts helps you keep track of your daily tasks in a gentle way. 
        You can add simple tasks, move them to "Done" when completed, and 
        see that even small efforts matter. For example, drinking a glass of water, 
        taking a short walk, stretching, washing your face, or writing a quick note. 
        This app is designed to support you in building positive daily habits 
        and feeling accomplished.
      </p>
      {message && <p id="message">{message}</p>}

      <div className="add-task">
        <input 
          type="text" 
          value={taskInput} 
          onChange={e => setTaskInput(e.target.value)} 
          placeholder="New task..."
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="lists">
        <div className="list" id="todo">
          <h2>To-Do</h2>
          {todoTasks.map(task => (
            <div 
              key={task.id} 
              className="task" 
              draggable
              onDragStart={e => handleDragStart(e, task.id)}
            >
              {task.text}
              <button onClick={() => deleteTask(task.id)}>✖</button>
            </div>
          ))}
        </div>

        <div 
          className="list" 
          id="done"
          onDragOver={e => e.preventDefault()} 
          onDrop={handleDropToDone}
        >
          <h2>Done</h2>
          {doneTasks.map(task => (
            <div key={task.id} className="task done">
              {task.text}
              <button onClick={() => deleteTask(task.id, true)}>✖</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
