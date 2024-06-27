import { createContext, useContext, useState, useEffect, useRef } from "react";
import { q } from "../data/questionDataInit";
import { v4 as uuidv4 } from 'uuid';
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";
import _ from 'lodash';

const { set } = _;

const FunnelEditContext = createContext(null);

const FunnelEditContextProvider = ({ children, store, funnel_id }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const API_FA = useRef(null);

  const [ title, setTitle ] = useState('');
  const [ funnelID, setFunnelID ] = useState(funnel_id == 'new' ? null : funnel_id);
  const [ storeID, setStoreID ] = useState(null);
  const [ tabActive, setTabActive ] = useState(0);
  const [ questions, setQuestions ] = useState(q);
  const [ editItem, setEditItem ] = useState(null);
  const [ funnelConnectors, setFunnelConnectors ] = useState(null);
  const [ isSave, setIsSave ] = useState(false);

  const loadFunnel = async (fID) => {
    const res = await API_FA.current.getFunnelById(fID);
    // console.log(res);
    setTitle(res?.title);
    setQuestions(res?.questions);
    setFunnelConnectors(res?.funnel_connectors);
  }

  useEffect(() => {
    API_FA.current = new ApiForApp(store?.id, APP_API_KEY, APP_API_ENDPOINT);
    if(funnelID) { loadFunnel(funnelID); }
  }, [funnelID])

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
          option_ui: 'default',
          options: [
            { __key: uuidv4(), label: 'Option 1', value: 'option_1' },
            { __key: uuidv4(), label: 'Option 2', value: 'option_2' },
            { __key: uuidv4(), label: 'Option 3', value: 'option_3' }
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
          option_ui: 'default',
          options: [
            { __key: uuidv4(), label: 'Option 1', value: 'option_1' },
            { __key: uuidv4(), label: 'Option 2', value: 'option_2' },
            { __key: uuidv4(), label: 'Option 3', value: 'option_3' }
          ],
          require: false,
        }
        break;
    }
  }

  const onAddQuestion = () => {
    setQuestions([...questions, {
      __key: uuidv4(),
      question: `New Question ${ questions.length + 1 }`,
      content: '',
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

  const onDeleteQuestion = (key) => {
    // questions, setQuestions
    let __index = questions.findIndex( o => o.__key === key);
    let __questions = [ ...questions ];
    __questions.splice(__index, 1);

    setQuestions(__questions);
  }

  const onSave = async () => {
    setIsSave(true);
    let data = {
      title: title,
      status: true,
      questions: questions,
      funnel_connectors: funnelConnectors,
    }

    if(funnelID) {
      data._id = funnelID;
    }

    const res = await API_FA.current.saveFunnel(data);
    setFunnelID(res._id);
    setIsSave(false);
  }

  const value = {
    title, setTitle,
    storeID, setStoreID,
    funnelID, setFunnelID,
    tabActive, setTabActive,
    questions, setQuestions,
    editItem, setEditItem,
    funnelConnectors, setFunnelConnectors,
    isSave, setIsSave,
    fn: {
      onAddQuestion,
      onAddField,
      onUpdateQuestionField,
      onDeleteField,
      onDeleteQuestion,
      onSave,
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