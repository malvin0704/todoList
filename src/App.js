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
      { id: "003", text: "Cooking for Dinner", flag: false }
    ]
  });
  const inputElement = useRef();
  const handleChange = (e) => {
    setState({ ...state, input: e.target.value });
  };
  const addTodo = () => {
    if (!inputElement) {
      setState({
        ...state,
        todoList: [
          ...state.todoList,
          { id: nanoid(), text: state.input, flag: false }
        ]
      });
      inputElement.current.value = "";
    } else {
      alert("Please add an todo first");
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
    console.log(e.target);
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
                      "&:hover": { color: "blue", fontSize: 14 }
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
          <input type="button" value="Done" />
        </div>
      </div>
    </div>
  );
}
