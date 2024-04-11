import { Fragment } from "react"

export default function VariantItem({ variant, onSelect, active }) {
  return <div 
    className={ ['variant-item', (active ? '__selected' : '')].join(' ') } 
    onClick={ e => onSelect(variant) }>
    {/* { JSON.stringify(variant) } */}
    <h4>
      { variant.displayName } 
      {
        variant?.builderData?.__options.length > 0 &&
        <>
          { ' ' }
          <sup>{ variant?.builderData?.__options.length } item(s)</sup>
        </>
      }
    </h4>
  </div>
}