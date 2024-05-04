import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import MenuVisualEditor from "./MenuVisualEditor";
import { TextField } from '@shopify/polaris';
import { produce } from "immer";

export default function GeneralSettings() {
  const { onUpdateBuilderData_Fn, menuBuilderData, setMenuBuilderData } = useMenuBuilderContext();

  return <div className="menu-builder__general-settings">
    <fieldset className="fieldset-ui">
      <legend>Title</legend>
      {/* <input 
        type="text" 
        value={ menuBuilderData.general.title } 
        onChange={ e => onUpdateBuilderData_Fn(e.target.value, 'general.title') } /> */}

        <TextField
          value={menuBuilderData.general.title}
          onChange={ value => {
            setMenuBuilderData(produce(draft => {
              draft.general.title = value
            }))
          } }
        />
    </fieldset>
    <div className="menu-builder__visual-editor-area">
      <MenuVisualEditor />
    </div>
  </div>
}