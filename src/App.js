import React from "react";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Content from "./components/Content";

const App = () => {
  return (
    <>
      <div className="h-screen w-screen bg-gradient-to-br from-stone-400 to-zinc-800 flex justify-center items-center">
        <div className="bg-[#211F1F] absolute m-auto flex flex-col justify-start items-center rounded-md shadow-lg shadow-black pb-3 w-screen h-screen md:h-[600px] md:max-h-[600px] md:max-w-[600px] md:w-[600px]">
          <Header />
          <Content />
        </div>
      </div>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "1rem",
          },
        }}
      />
    </>
  );
};

export default App;
