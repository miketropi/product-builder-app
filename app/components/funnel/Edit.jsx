import { Fragment } from "react";
import { useFunnelEditContext } from "../../context/FunnelEditContext";
import Tab, { TabItem } from "../Tab";
import BuildQuestions from "./BuildQuestions";
import { ClientOnly } from "remix-utils/client-only";

export default function Edit() { 
  const { tabActive, setTabActive } = useFunnelEditContext(); 
  return <ClientOnly>
    {
      () => {
        return <Tab  
          activeTabIndex={ tabActive } 
          onSelectTab={ __tab_index => { setTabActive(__tab_index) } }> 
          <TabItem name={ 'Build Questions' }>
            <BuildQuestions />
          </TabItem> 
          <TabItem name={ 'Build Funnel Connectors' }>2</TabItem> 
        </Tab>
      }
    }
  </ClientOnly>  
} 