import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";

const AddTodo = ({ type, modal, setModal, todo }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Pending");
  const [due, setDue] = useState("");
  const [duedate, setDueDate] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setDue(todo.due);
      setDueDate(todo.duedate);
    } else {
      setTitle("");
      setStatus("Pending");
      setDue("");
      setDueDate("");
    }
  }, [type, todo, modal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      toast.error("Please specify Task Title.");
      return;
    }
    if (title && status) {
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            due,
            duedate,
            date: new Date().toLocaleString(),
          })
        );
        toast.success("Task Added Successfully");
      }
      if (type === "update") {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.due !== due ||
          todo.duedate !== duedate
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
              due,
              duedate,
            })
          );
        } else {
          toast.error("No Changes Made");
          return;
        }
      }
      setModal(false);
    } else {
      toast.error("You need to answer the required field!");
    }
  };

  return (
    <div>
      {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800/50 z-50 flex justify-center items-center">
          <div className="bg-gray-200 max-w-[500px] w-[90%] my-auto flex jusify-center items-center p-4 rounded-md relative">
            <div className="absolute top-[-10px] right-0 translate-y-[-100%] text-xl p-1 rounded-md text-black bg-gray-200 flex items-center cursor-pointer ease-in-out hover:bg-red-800 hover:text-white">
              <MdClose
                onClick={() => setModal(false)}
                tabIndex={0}
                role="button"
              />
            </div>
            <form
              className="w-full"
              onSubmit={(e) => handleSubmit(e)}
            >
              <h1 className="text-2xl font-bold mb-[2rem]">
                {type === "update" ? "Update" : "Add"} Task
              </h1>
              <label className="text-md font-medium">Task Name</label>
              <input
                className="mt-1 mb-2 w-full p-1 border-none bg-white text-md"
                type="text"
                placeholder="Task Name"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="text-md font-medium">Due</label>
              <input
                className="mt-1 mb-2 w-full p-1 border-none bg-white text-md"
                type="time"
                id="due"
                value={due}
                onChange={(e) => setDue(e.target.value)}
              />
              <input
                className="mt-1 mb-2 w-full p-1 border-non bg-white text-md"
                type="date"
                id="duedate"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <label className="text-md font-medium">Status</label>
              <select
                className="mt-1 mb-2 w-full p-1 border-none bg-white text-md"
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">""</option>
                <option value="pending">Pending</option>
                <option value="accomplished">Accomplished</option>
              </select>
              <div className="flex flex-start items-center mt-4 gap-[1rem] mb-2 flex-wrap">
                <button
                  className="p-2 px-4 bg-purple-600/75 text-white shadow-md shadow-purple-300 font-bold rounded-2xl hover:bg-purple-600 hover:shadow-inner hover:shadow-purple-400"
                  type="submit"
                >
                  {type === "update" ? "Update" : "Add"} Task
                </button>
                <button
                  className="bg-gray-300 p-2 px-4 rounded-2xl hover:bg-gray-400 shadow-sm shadow-gray-600 hover:shadow-inner hover:shadow-gray-600"
                  type="button"
                  onClick={() => setModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTodo;
