import { Children, useState, useEffect, useCallback, Fragment, isValidElement } from 'react';
import { sanitizeForId } from '../libs/helpers';

export default function Tab({ children, activeTabIndex, onSelectTab }) {
  const tabs = Children.toArray(children).filter(child => {
    return isValidElement(child) && (child.type.name == TabItem.name)
  })

  return <div className="tab-comp">
    <ul className="tab-comp__heading">
      {
        tabs.map((item, __i_index) => {
          const { name } = item.props;
          const isActive = __i_index === activeTabIndex
          return <li 
            className={ ['__tab-heading-item', (isActive ? '__active' : '')].join(' ') }
            onClick={ e => onSelectTab(__i_index, item) }>
            <span>{ name }</span>
          </li>
        })
      }
    </ul>
    <div className="tab-comp__body">
      { tabs[activeTabIndex] }
    </div>
  </div>
}

export function TabItem({ name, children }) {
  return <div
    className="tab-panel"
    role="tabpanel"
    aria-labelledby={`tab-${sanitizeForId(name)}`}
    id={`panel-${sanitizeForId(name)}`}
  >
    {children}
  </div>
}