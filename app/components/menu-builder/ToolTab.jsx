import { Fragment } from "react";
import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import { Icon } from '@shopify/polaris';
import GeneralSettings from './GeneralSettings'

export default function ToolTab() {
  const __context = useMenuBuilderContext();
  const tabContentMap = {
    '8308c163-0ba7-4852-922e-834a6360e45e': <GeneralSettings />
  }

  return <div className="menu-builder__tooltab">
    {
      __context?.menuToolTabData && 
      <>
        <ul className="menu-builder__tooltab-nav">
          {
            __context.menuToolTabData.map(tabItem => {
              const { __key, icon, name } = tabItem;
              const activeTab = (__context.currentTab == __key ? '__active' : '');
              return <li 
                key={ __key } 
                className={ ['menu-builder__tooltab-nav-item', activeTab].join(' ') }>
                <label onClick={ e => onChangeCurrentTab_Fn(__key) }>
                  <Icon source={ icon } />
                  <span>{ name }</span> 
                </label>
              </li>
            }) 
          }
        </ul> 
        <div className="menu-builder__tooltab-content">
          {
            tabContentMap[__context.currentTab]
          }
          {/* {
            __context.menuToolTabData.find(tabItem => tabItem.__key == __context.currentTab).content
          } */}
        </div>
      </>
    }
  </div>
}