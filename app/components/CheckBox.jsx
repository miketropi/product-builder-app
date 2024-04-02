import { Icon } from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

export default function CheckBox({ checked }) {
  return <div className={ ['checkbox-fake-ui', (checked ? '__checked' : '')].join(' ') }>
    <span className="checkbox-fake-ui__target">
      {
        checked ? <Icon source={ CheckIcon } /> : ''
      }
    </span>
  </div>
}