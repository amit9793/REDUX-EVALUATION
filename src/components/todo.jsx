import {
  addTodo,
  addTodoError,
  addTodoLoading,
  addTodoSuccess,
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../store/actionType";
import "../userdata.css";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const Todos = () => {
  const [text, setText] = useState("");
  // const todos = useSelector((state) => state.todos);
  const { loading, todos, error } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todos,
    error: state.error,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      dispatch(getTodoLoading());
      const data = await fetch("http://localhost:3004/todos").then((d) =>
        d.json()
      );
      dispatch(getTodoSuccess(data));
    } catch (err) {
      dispatch(getTodoError(err));
    }
  }

  var arr = [];
  var c = arr.length - 1;
  console.log("my arr", arr);

  const sort = () => {
    arr.sort();
  };
  var z = 0;

  return loading ? (
    <div>Loading....</div>
  ) : error ? (
    <div> Something wemt wrong!</div>
  ) : (
    <div className="parents">
      <div className="admin">
        <h1>ADMIN PORTAL</h1>
        <input
          value={text}
          type="text"
          placeholder="Enter job Role"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch(addTodoLoading());
            fetch("http://localhost:3004/todos", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: false, title: text }),
            })
              .then((d) => d.json())
              .then((res) => {
                dispatch(addTodoSuccess(res));
                getTodos(); ///// show deta
              })
              .catch((err) => {
                dispatch(addTodoError(err));
              });
          }}
        >
          POST JOB
        </button>
        {todos.map((e) => (
          <div>
            <h3>{e.title}</h3>
          </div>
        ))}
      </div>
      <right>
        <div className="userdata">
          <h1>User Portal</h1>
          <div>
            {todos.map((e) => (
              <div>
                {arr.push(e.title)}
                <h3>{e.title}</h3>
                <button>APPLY</button>
              </div>
            ))}
          </div>
        </div>
      </right>
      <div>
        <h1>SORTED POST</h1>
        <div onClick={sort()}>
          <div className="srting">
            {arr.map((e) => (
              <h3>{e}</h3>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
