import { Fragment, useState } from "react";
import { useFunnelEditContext } from "../../context/FunnelEditContext";
import Tab, { TabItem } from "../Tab";
import BuildQuestions from "./BuildQuestions";
import { ClientOnly } from "remix-utils/client-only";
import { TextField, Button, Spinner } from '@shopify/polaris';
import BuildFunnelConnectors from "./BuildFunnelConnectors";
import { useAppBridge, } from '@shopify/app-bridge-react';
import { DeleteIcon } from '@shopify/polaris-icons';

export default function Edit() { 
  const shopify = useAppBridge();
  const [ questionAutoLoading, setQuestionAutoLoading ] = useState(false);
  const { tabActive, setTabActive, title, setTitle, collectionDefault, setCollectionDefault, fn, hiddenFunnelConnectors } = useFunnelEditContext(); 
  const { onAutoLoadQuestionByCollection } = fn;
  
  return <ClientOnly>
    {
      () => {
        return <>
          <div className="question-edit__heading">
            <TextField
              prefix="Title: "
              value={ title }
              onChange={ v => { setTitle(v) } }
              autoComplete="off" 
              helpText={ 'Enter your funnel name.' }
            />
          </div>
          <br />
          <fieldset className="__filter-by-collection __q-fieldset" style={{
            background: 'white', 
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
          }}>
            <legend>Select Collection Default</legend> 
            {
              ((__c) => {
                if(__c?.id) {
                  return <>
                    Collection selected: <strong>{ collectionDefault?.title } ({ collectionDefault?.id })</strong> | 
                    {/* <span style={{ color: 'red', cursor: 'pointer' }} onClick={ e => {
                      let r = confirm('Are you sure you want to delete?');
                      if(r) {
                        setCollectionDefault(null)
                      }
                    } }>✕ Delete</span>  */}
                    <Button 
                      variant="primary" 
                      tone="critical" 
                      icon={ DeleteIcon }
                      loading={ questionAutoLoading }
                      onClick={ e => {
                        let r = confirm('Are you sure you want to delete?');
                        if(r) {
                          setCollectionDefault(null)
                        }
                      } }
                    >Remove</Button>
                  </>
                } else {
                  return <Button onClick={ async e => {
                    const selected = await shopify.resourcePicker({
                      type: 'collection', 
                      multiple: false,
                      // selectionIds: ids, // __o.map(o => ({ id: o.__c_id })),
                    });
                    if(!selected) return;
      
                    const { handle, title, id, productsCount } = selected[0];
                    setCollectionDefault({ handle, title, id, productsCount });

                    // let r = confirm('Do you want auto-load filter questions?');
                    // if(r) {
                    //   // console.log('loading...!')
                    //   setQuestionAutoLoading(true);
                    //   await onAutoLoadQuestionByCollection(handle);
                    //   setQuestionAutoLoading(false);
                    // }

                    setQuestionAutoLoading(true);
                    await onAutoLoadQuestionByCollection(handle); 
                    setQuestionAutoLoading(false);
                  } }>Select Collection</Button>
                }
              })(collectionDefault)
            }
          </fieldset>
          <br />
          <Tab  
            activeTabIndex={ tabActive } 
            onSelectTab={ __tab_index => { setTabActive(__tab_index) } }> 
            <TabItem name={ 'Build Questions' }>
              <BuildQuestions />
            </TabItem> 
            {/* { console.log(hiddenFunnelConnectors, typeof hiddenFunnelConnectors) } */}
            {
              (hiddenFunnelConnectors == true 
              ? <TabItem name={ 'Build Funnel Connectors' }>
                <BuildFunnelConnectors />
              </TabItem> 
              : '') 
            }
            
          </Tab>
        </>
      }
    }
  </ClientOnly>  
} 