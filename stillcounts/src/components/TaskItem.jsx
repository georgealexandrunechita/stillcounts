function TaskItem({ task, onToggle }) {
    return (
        <button
            className={`task ${task.done ? "done" : ""}`}
            onClick={() => onToggle(task.id)}
            aria-pressed={task.done}
        >
            {task.text}
        </button>
    );
}

export default TaskItem;
