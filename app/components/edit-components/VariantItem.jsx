export default function VariantItem({ variant, onSelect, active }) {
  return <div 
    className={ ['variant-item', (active ? '__selected' : '')].join(' ') } 
    onClick={ e => onSelect(variant) }>
    {/* { JSON.stringify(variant) } */}
    <h4>{ variant.displayName }</h4>
  </div>
}