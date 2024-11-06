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
          option_style: '2-cols-square-472_472',
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

  const onBuildDataFunnelAutoConnect = (q, collection_handle) => {
    let funnelConnect = {
      nodes: [
        {
          id: '__START__',
          type: 'StartNode',
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: 'Start',
          }
        },
        ...((_q) => {
          return _q.map((i, __i_index) => {
            // console.log(i)
            let x = (__i_index + 1) * 178.46139340517004;

            return {
              id: i.__key,
              type: 'QuestionNode',
              position: {
                x: x,
                y: -6,
              },
              data: {
                question_key: i.__key,
              },
              selected: false,
              positionAbsolute: {
                x: x,
                y: -6,
              },
              dragging: false,
            }
          }) 
        })(q),
        {
          id: '__redirect-node',
          type: 'RedirectNode',
          position: {
            x: (q.length + 1) * 178.46139340517004,
            y: -6,
          },
          data: {
            redirect_url: ((_q) => {
              // https://www.buildmat.com.au/collections/kitchen-mixers?pf_t_product_typ=[value]6f4a6bd7-edd0-47dc-a796-e2d3b5af64b0[/value]&pf_t_colour=[value]e46f2143-a7a9-46b9-b635-843c7fcd5d9d[/value]?pf_t_range=[value]b3b7de2e-27ce-4e92-8db8-0708091e6fb7[/value]&pf_t_features=[value]d960f61a-faf7-4734-ae90-0cd85051ab6d[/value]
              let mapArgs = {
                'Select Brand': 'pf_v_brand',
                'Select Product Type': 'pf_t_product_type',
                'Select Colour': 'pf_t_colour',
                'Select Range': 'pf_t_range',
                'Select Features': 'pf_t_features',
                'Select Shape': 'pf_t_shape',
              };
              let urlParamFilterArr = _q.map(({ question, __key }) => {
                return `${ mapArgs[question] }=[value]${ __key }[/value]`;
              });
              
              return `https://www.buildmat.com.au/collections/${ collection_handle }?${ urlParamFilterArr.join('&') }`;
            })(q),
          },
          width: 150,
          height: 74,
          selected: true,
          positionAbsolute: {
            x: 1548.2596075717672,
            y: -6,
          },
          dragging: false,
        },
      ],
      edges: [
        {
          source: '__START__',
          sourceHandle: null,
          target: q[0].__key,
          targetHandle: null,
          id: `reactflow__edge-__START__-${ q[0].__key }`,
        },
        ...(_q => {
          return _q.map((i, __i_index) => {
            let __next = '';
            if(q[__i_index + 1]) {
              __next = q[__i_index + 1].__key;
            } else {
              __next = '__redirect-node';
            }
            
            return {
              source: i.__key,
              sourceHandle: null,
              target: __next,
              targetHandle: null,
              id: `reactflow__edge-${ i.__key }-${ __next }`,
            }
          })
        })(q)
      ], 
    }
    console.log(funnelConnect);

    return funnelConnect;
  }

  const onAutoLoadQuestionByCollection = async (collection_handle) => {
    // let fetchUrl = `https://buildmat-scraping.fly.dev/${ collection_handle }`;
    let fetchUrl = `https://buildmat-scraping.fly.dev/kitchen-sinks`;

    const { id, myshopifyDomain } = store;
    if(id == 'gid://shopify/Shop/2398814278') { // product site id
      fetchUrl = `https://buildmat-scraping.fly.dev/${ collection_handle }`;
    }  

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
          option_style: '2-cols-square-472_472', 
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

    const { nodes, edges } = onBuildDataFunnelAutoConnect(newOpts, collection_handle);
    setNodes(nodes);
    setEdges(edges);
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