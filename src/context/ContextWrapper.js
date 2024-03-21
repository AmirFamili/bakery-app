import React, { useState } from "react";

export const GlobalContext = React.createContext();

const ContextWrapper = (props) => {
  const [addCart, setAddCart] = useState(0);
  const [page, setPage] = useState("home");

  return (
    <GlobalContext.Provider value={{addCart, setAddCart, page, setPage }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
export default ContextWrapper;
