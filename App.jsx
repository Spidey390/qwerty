import React, { useState } from 'react'
const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    function addTodo() {
        if (input.trim()) {
            if (editIndex === null) {
                setTodos([...todos, { id: Date.now(), text: input }]);
            } else {
                const updated = [...todos];
                updated[editIndex].text = input;
                setTodos(updated);
                setEditIndex(null);
            }
            setInput('');
        }
    }
    function editTodo(index) {
        setEditIndex(index);
        setInput(todos[index].text);
    }
    function deleteTodo(index) {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated);
    }
    return (
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <input
                type='text'
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter the task'
                value={input}
            />
            <button onClick={addTodo}>
                {editIndex === null ? 'Add Task' : 'Update Task'}
            </button>
            <h2>Your Tasks</h2>
            {todos.map((todo, index) => (
                <div key={todo.id}>
                    <p>{todo.text}</p>
                    <button onClick={() => editTodo(index)}>Edit</button>
                    <button onClick={() => deleteTodo(index)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
export default App;