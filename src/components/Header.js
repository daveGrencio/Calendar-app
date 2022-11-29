import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilterStatus } from "../slices/todoSlice";
import AddTodo from "./AddTodo";

const Header = () => {
  const [modal, setModal] = useState(false);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const dispatch = useDispatch();

  const updateFilter = (e) => {
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-start items-center w-full px-4 relative mb-8 bg-gradient-to-b to-purple-600/75 from-red-300">
        <h1 className="pb-5 font-bold text-3xl m-3 md:p-2">Todo List</h1>

        <div className="flex p-2 w-full items-center flex-wrap justify-between flex-row">
          <button
            className="hidden: md:bg-purple-600/75 md:text-white md:shadow-sm md:shadow-purple-800 md:font-bold md:p-2 md:px-4 md:hover:bg-purple-600 md:hover:shadow-inner md:hover:shadow-purple-400 md:mb-12 md:rounded-2xl"
            onClick={() => setModal(true)}
          >
            <p className="hidden md:block">Add Task</p>
          </button>
          <button
            className="text-3xl text-white absolute top-0 right-0 rounded-full bg-purple-800 m-3 pb-2 pt-1 px-4 shadow-purple-800 shadow-md md:hidden"
            onClick={() => {
              setModal(true);
            }}
          >
            +
          </button>
          <select
            className="rounded-3xl p-2 md:rounded-md hover:cursor-pointer shadow-sm bg-gradient-to-tl from-blue-700 to-cyan-400 shadow-inherit mb-12"
            id="status"
            value={filterStatus}
            onChange={updateFilter}
          >
            <option value="all">ALL</option>
            <option value="accomplished">Accomplished</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        <div className="divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
      <AddTodo
        type="add"
        modal={modal}
        setModal={setModal}
      />
    </div>
  );
};

export default Header;
