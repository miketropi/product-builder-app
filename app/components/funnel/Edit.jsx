import { Fragment } from "react";
import { useFunnelEditContext } from "../../context/FunnelEditContext";
import Tab, { TabItem } from "../Tab";
import BuildQuestions from "./BuildQuestions";
import { ClientOnly } from "remix-utils/client-only";
import {TextField} from '@shopify/polaris';

export default function Edit() { 
  const { tabActive, setTabActive, title, setTitle } = useFunnelEditContext(); 
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
          <Tab  
            activeTabIndex={ tabActive } 
            onSelectTab={ __tab_index => { setTabActive(__tab_index) } }> 
            <TabItem name={ 'Build Questions' }>
              <BuildQuestions />
            </TabItem> 
            <TabItem name={ 'Build Funnel Connectors' }>2</TabItem> 
          </Tab>
        </>
      }
    }
  </ClientOnly>  
} 