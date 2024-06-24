import { TextField } from '@shopify/polaris';

export default function OptionsRepeater(props) {
  const { options, onChange } = props;

  return <div className="options-repeater-comp">
    <ul className="option-list">
      {
        options && options.length > 0 &&
        options.map((o, __o_index) => {
          const { __key, value, label } = o;
          return <li key={ __key } className="option-item">
            <TextField
              value={ value }
              onChange={ v => {} }
              prefix="Value: "
              autoComplete="off"
            />

            <TextField
              value={ label }
              onChange={ v => {} }
              prefix="Label: "
              autoComplete="off"
            />
          </li>
        })
      }
    </ul>
  </div>
}