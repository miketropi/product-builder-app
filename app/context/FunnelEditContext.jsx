import { createContext, useContext, useState, useEffect } from "react";
import { q } from "../data/questionDataInit";
import { v4 as uuidv4 } from 'uuid';

const FunnelEditContext = createContext(null);

const FunnelEditContextProvider = ({ children }) => {
  const [ tabActive, setTabActive ] = useState(0);
  const [ questions, setQuestions ] = useState(q);
  const [ editItem, setEditItem ] = useState(null);

  const onAddQuestion = () => {
    setQuestions([...questions, {
      __key: uuidv4(),
      question: `New Question ${ questions.length }`,
      content: 'Content...!',
      field: null,
    }])
  }

  const value = {
    tabActive, setTabActive,
    questions, setQuestions,
    editItem, setEditItem,
    fn: {
      onAddQuestion,
    }
  }

  return <FunnelEditContext.Provider value={ value }>
    { children }
  </FunnelEditContext.Provider>
}

const useFunnelEditContext = () => {
  return useContext(FunnelEditContext); 
}

export { FunnelEditContextProvider, useFunnelEditContext }