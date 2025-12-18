import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle }) {
    return (
        <section className="task-list">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                />
            ))}
        </section>
    );
}

export default TaskList;
