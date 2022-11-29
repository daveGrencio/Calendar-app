import React from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import TodoItem from "./TodoItem";

const Content = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const sortedTodoList = [...todoList];
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const filtered = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    <motion.div
      className="w-full h-full flex justify-start p-4 flex-col overflow-auto"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <AnimatePresence>
        {filtered && filtered.length > 0 ? (
          filtered.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))
        ) : (
          <div className="h-full items-center flex justify-center flex-wrap">
            <motion.h1
              className="text-3xl font-semibold text-white"
              variants={child}
            >
              Wow, such empty.
            </motion.h1>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Content;
