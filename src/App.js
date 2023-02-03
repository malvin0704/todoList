import "./styles.css";
import { nanoid } from "nanoid";
import { useState, useRef } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export default function App() {
  const [state, setState] = useState({
    input: "",
    todoList: [
      { id: "001", text: "Playing Game", flag: false },
      { id: "002", text: "Learning React", flag: false },
      { id: "003", text: "Cooking for Dinner", flag: false },
    ],
  });
  const inputElement = useRef();
  const handleChange = (e) => {
    setState({ ...state, input: e.target.value });
  };
  const addTodo = () => {
    console.log(inputElement.current.value);
    if (inputElement.current.value === "") {
      alert("Please add an todo first");
    } else {
      setState({
        ...state,
        todoList: [
          ...state.todoList,
          { id: nanoid(), text: state.input, flag: false },
        ],
      });
      inputElement.current.value = "";
    }
  };
  const handleDelete = (e) => {
    let deleteItem = e.currentTarget.getAttribute("identifier");
    let newTodoList = state.todoList.filter((item) => {
      return item.id !== deleteItem;
    });
    console.log(newTodoList);
    setState({ ...state, todoList: newTodoList });
  };
  const handleCheck = (e) => {
    const { target } = e;
    const updateTodoList = state.todoList.map((item) => {
      if (item.id === target.id) {
        item.flag = !item.flag;
      }
      return item;
    });
    setState({ ...state, todoList: updateTodoList });
  };
  const handleClearall = () => {
    const clearTodoList = state.todoList.slice(0, 0);
    setState({ ...state, todoList: clearTodoList });
  };

  return (
    <div className="App">
      <div id="wrapper">
        <div id="top">
          <h1>Todo List</h1>
          <input
            type="text"
            placeholder="add an todo"
            onChange={handleChange}
            ref={inputElement}
          />
          <input type="button" value="Add" onClick={addTodo} />
        </div>
        <ul>
          {state.todoList.map((item) => {
            return (
              <li key={item.id}>
                <label>
                  <input
                    id={item.id}
                    type="checkbox"
                    defaultChecked={state.todoList.flag}
                    onChange={handleCheck}
                  />
                  {item.text}
                </label>
                <span id="icon">
                  <DeleteForeverIcon
                    sx={{
                      fontSize: 10,
                      "&:hover": { color: "blue", fontSize: 14 },
                    }}
                    identifier={item.id}
                    onClick={handleDelete}
                  />
                </span>
              </li>
            );
          })}
        </ul>
        <div id="footer">
          <input type="button" value="Done" onClick={handleDone} />
          <input type="button" value="Clear All" onClick={handleClearall} />
        </div>
      </div>
    </div>
  );
}
