import { Tooltip } from '@shopify/polaris';

export default function ToggleField( props ) {
  const { className, onChange, checked, tooltipText } = props;

  return <div 
    className={ ['toggle-field-comp', className, (checked == true ? '__active' : '')].join(' ') } 
    onClick={ e => {
      e.preventDefault();
      onChange();
    } } 
  >
    <Tooltip content={ tooltipText }>
      <div className="toggle-field-comp__inner">
        <span className="__ball"></span>
      </div> 
    </Tooltip>
  </div>
}