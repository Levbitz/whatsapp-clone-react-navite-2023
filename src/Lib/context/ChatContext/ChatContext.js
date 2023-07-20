import { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [state, setState] = useState({
    chatId: "null",
    user: {},
  });

  useEffect(() => {
    setState((prevState) => ({

    
      // ...prevState,
      // chatId:
      //   currentUser.uid > prevState.user.uid
      //     ? currentUser.uid + prevState.user.id
      //     : prevState.user.id + currentUser.uid,
    }));
  }, [currentUser]);

  const changeUser = (payload) => {
    setState((prevState) => ({
      ...prevState,
      user: payload,
    }));
  };

  return (
    <ChatContext.Provider value={{ data: state, changeUser }}>
      {children}
    </ChatContext.Provider>
  );
};
