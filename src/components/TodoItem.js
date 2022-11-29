import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";

import AddTodo from "./AddTodo";
import CheckButton from "./CheckButton";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Task Deleted Successfully");
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "pending" : "accomplished",
      })
    );
  };

  useEffect(() => {
    if (todo.status === "accomplished") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  return (
    <>
      <motion.div
        className={
          todo.status === "accomplished"
            ? "flex items-center justify-between flex-wrap flex-row p-2 px-4 bg-gradient-to-tl from-gray-600 to-zinc-400 shadow-inherit shadow-lg mb-4 rounded-xl last:mb-4 md:justify-between md:mb-3"
            : "flex items-center justify-between flex-wrap flex-row p-2 px-4 bg-gradient-to-br from-red-400 to-blue-700 shadow-inherit shadow-lg mb-4 rounded-xl last:mb-4 hover:bg-gradient-to-br hover:to-red-800 hover:from-blue-400 md:justify-between md:mb-3"
        }
        variants={child}
      >
        <div className="flex items-center justify-center flex-wrap gap-[1rem] md:justify-start">
          <CheckButton
            checked={checked}
            handleCheck={handleCheck}
          />
          <div className="flex flex-col overflow-hidden justify-center items-center md:justify-start md:items-start">
            <p
              className={
                todo.status === "accomplished"
                  ? "break-all font-semibold text-xl line-through opacity-70"
                  : " break-all font-bold text-xl text-gray-900"
              }
            >
              {todo.title}
            </p>
            <p
              className={
                todo.status === "accomplished"
                  ? "hidden"
                  : "hidden md:text-gray-300 md:font-semibold md:mb-0 md:block"
              }
            >
              Due: {todo.duedate} {todo.due}
            </p>
            <p
              className={
                todo.status === "accomplished"
                  ? "hidden"
                  : "hidden md:text-gray-300 md:font-semibold md:mt-0 md:block"
              }
            >
              Created: {todo.date}
            </p>
            <p
              className={
                todo.status === "accomplished"
                  ? "text-gray-300 md:font-semibold md:mb-0 md:block"
                  : "hidden"
              }
            >
              Completed
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center flex-wrap md:flex-row md:m-2 md:w-[120px]">
          <div
            className="bg-gray-300 rounded-md text-2xl p-2 m-2 hover:scale-110 duration-200 ease-in-out hover:animate-pulse hover:text-green-700"
            onClick={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <AiOutlineEdit />
          </div>
          <div
            className="bg-gray-300 rounded-md m-2 text-2xl p-2 hover:scale-110 duration-200 ease-in-out hover:animate-pulse hover:text-red-700"
            onClick={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
        </div>
      </motion.div>

      <AddTodo
        type="update"
        todo={todo}
        modal={updateModalOpen}
        setModal={setUpdateModalOpen}
      />
    </>
  );
};

export default TodoItem;
