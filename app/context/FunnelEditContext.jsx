import { createContext, useContext, useState, useEffect } from "react";
import { q } from "../data/questionDataInit";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const { set } = _;

const FunnelEditContext = createContext(null);

const FunnelEditContextProvider = ({ children }) => {
  const [ tabActive, setTabActive ] = useState(0);
  const [ questions, setQuestions ] = useState(q);
  const [ editItem, setEditItem ] = useState(null);

  useEffect(() => {
    if(!editItem) return;

    let __questions = [...questions];
    let found = __questions.findIndex(__q => (__q.__key === editItem.__key));
    __questions[found] = { ...editItem };

    setQuestions(__questions);
  }, [editItem])

  const fieldTypeData = (c) => {
    switch(c) {
      case 'QTextField':
        return {
          help_text: '',
          type: c,
          placeholder: '',
          value: '',
          required: false,
        }
        break;
      
      case 'QSingleChoice':
        return {
          help_text: '',
          type: c,
          value: '',
          options: [
            { label: 'Option 1', value: 'option_1' },
            { label: 'Option 2', value: 'option_2' },
            { label: 'Option 3', value: 'option_3' }
          ],
          require: false,
        }
        break;

      case 'QMultipleChoice':
        return {
          help_text: '',
          type: c,
          value: [],
          multiple: true, 
          options: [
            { label: 'Option 1', value: 'option_1' },
            { label: 'Option 2', value: 'option_2' },
            { label: 'Option 3', value: 'option_3' }
          ],
          require: false,
        }
        break;
    }
  }

  const onAddQuestion = () => {
    setQuestions([...questions, {
      __key: uuidv4(),
      question: `New Question ${ questions.length }`,
      content: 'Content...!',
      field: null,
    }])
  }

  const onAddField = (c) => {
    const fieldData = fieldTypeData(c);
    setEditItem({ ...editItem, field: fieldData });
  }

  const onUpdateQuestionField = (value, path) => {
    let __editItem = { ...editItem };
    set(__editItem, path, value);

    setEditItem(__editItem);
  }

  const onDeleteField = () => {
    let __editItem = { ...editItem };
    set(__editItem, 'field', null);

    setEditItem(__editItem);
  }

  const value = {
    tabActive, setTabActive,
    questions, setQuestions,
    editItem, setEditItem,
    fn: {
      onAddQuestion,
      onAddField,
      onUpdateQuestionField,
      onDeleteField,
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