import { createContext, useContext, useState, useEffect, useRef } from "react";
import { q } from "../data/questionDataInit";
import { v4 as uuidv4 } from 'uuid';
import { useOutletContext } from "@remix-run/react";
import ApiForApp from "../libs/api";
import _ from 'lodash';
import ReactFlow, {
  useNodesState,
  useEdgesState, 
} from 'reactflow';

const { set } = _;

const FunnelEditContext = createContext(null);

const FunnelEditContextProvider = ({ children, store, funnel_id }) => {
  const { APP_API_KEY, APP_API_ENDPOINT } = useOutletContext();
  const API_FA = useRef(null);

  const [ title, setTitle ] = useState('');
  const [ funnelID, setFunnelID ] = useState(funnel_id == 'new' ? null : funnel_id);
  const [ storeID, setStoreID ] = useState(null);
  const [ tabActive, setTabActive ] = useState(0);
  const [ questions, setQuestions ] = useState([]);
  const [ collectionDefault, setCollectionDefault ] = useState(null); 
  const [ editItem, setEditItem ] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([ 
    { id: '__START__', type: 'StartNode', position: { x: 0, y: 0 }, data: { label: 'Start' } },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [ isSave, setIsSave ] = useState(false);

  const loadFunnel = async (fID) => {
    const res = await API_FA.current.getFunnelById(fID);
    // console.log(res);
    setTitle(res?.title);
    setQuestions(res?.questions);
    setCollectionDefault(res?.collection_object_default);

    // setFunnelConnectors(res?.funnel_connectors);
    if(res?.funnel_connectors) {
      const { nodes, edges } = res.funnel_connectors;
      setNodes(nodes);
      setEdges(edges);
    }
    
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
          required: false,
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
          required: false,
        }
        break;

      case 'QCollectionChoice':
        return {
          help_text: '',
          type: c,
          placeholder: '',
          tag_name: '',
          options: [],
          value: [],
          required: false, 
        }
        break;

      case 'QTagChoice':
        return {
          help_text: '',
          type: c,
          placeholder: '',
          options: [],
          value: [],
          required: false, 
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
      collection_object_default: collectionDefault,
      funnel_connectors: {
        nodes,
        edges
      },
    }

    if(funnelID) {
      data._id = funnelID;
    }

    const res = await API_FA.current.saveFunnel(data);
    setFunnelID(res._id);
    setIsSave(false);
  }

  const onAddQuestion__Flow = (__q_key) => {
    const newNode = {
      id: __q_key,
      type: 'QuestionNode',
      position: { x: 0, y: 0 },
      data: { 
        question_key: __q_key,
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  const onAddRedirectNode_Flow = () => {
    const newNode = {
      id: uuidv4(),
      type: 'RedirectNode',
      position: { x: 0, y: 0 },
      data: { 
        redirect_url: '#',
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }

  const onUpdateNodeData_Flow = (nodeID, fKey, fValue) => {
    let __nodes = [...nodes];
    let __found = __nodes.findIndex(n => n.id == nodeID);
    __nodes[__found].data = { ...__nodes[__found].data, [fKey]: fValue }
    // fValue;
    setNodes(__nodes);
  }

  const onCloneEditItem = () => {
    let __cloneEditItem = JSON.parse(JSON.stringify(editItem));
    __cloneEditItem.question = `${ __cloneEditItem.question } (Duplicate)`;
    __cloneEditItem.__key = uuidv4();
    if(__cloneEditItem?.field?.options) {
      __cloneEditItem.field.options = [...__cloneEditItem.field.options].map((o) => {
        let __o = { ...o, __key: uuidv4() };
        return __o;
      })
    }

    // console.log(__cloneEditItem);
    setQuestions([...questions, __cloneEditItem]);
    setEditItem(__cloneEditItem);
  }

  const onAutoLoadQuestionByCollection = async (collection_handle) => {
    // const fetchUrl = `https://buildmat-scraping.fly.dev/${ collection_handle }`;
    const fetchUrl = `https://buildmat-scraping.fly.dev/kitchen-sinks`;
    const res = await fetch(fetchUrl)
      .then(async r => {
        return await r.json()
      })
      .catch(err => { 
        alert(err.message); 
      })
    
    if(!res) return;
    let newOpts = res.filter(i => ['Brand', 'Product Type', 'Colour', 'Range', 'Features', 'Shape'].includes(i.label)).map(({label, options}) => {
      
      
      return {
        __key: uuidv4(),
        question: `Select ${ label }`,
        field: {
          help_text: '',
          type: 'QTagChoice',
          placeholder: '',
          options: options.map(__o => {
            let __value = __o.value;
            if(label == 'Brand') {
              __value = `Brand_${ __value }`
            }
            return  { __key: uuidv4(), label: __o.label, value: __value }
          }),
          value: [],
          required: false, 
        }
      }
    })

    setQuestions(newOpts);
  }

  const value = {
    title, setTitle,
    storeID, setStoreID,
    funnelID, setFunnelID,
    tabActive, setTabActive,
    questions, setQuestions,
    editItem, setEditItem,
    isSave, setIsSave,
    collectionDefault, setCollectionDefault,
    fn: {
      onAddQuestion,
      onAddField,
      onUpdateQuestionField,
      onDeleteField,
      onDeleteQuestion,
      onSave,
      onCloneEditItem,
      onAutoLoadQuestionByCollection,
    },
    flowDesign: {
      nodes, setNodes, onNodesChange,
      edges, setEdges, onEdgesChange, 
      onAddQuestion__Flow,
      onAddRedirectNode_Flow,
      onUpdateNodeData_Flow,  
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