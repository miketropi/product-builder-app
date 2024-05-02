import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import MenuVisualEditor from "./MenuVisualEditor";

export default function GeneralSettings() {
  const { onUpdateBuilderData_Fn, menuBuilderData } = useMenuBuilderContext();

  return <div className="menu-builder__general-settings">
    <fieldset className="fieldset-ui">
      <legend>Title</legend>
      <input 
        type="text" 
        value={ menuBuilderData.general.title } 
        onChange={ e => onUpdateBuilderData_Fn(e.target.value, 'general.title') } />
    </fieldset>
    <div className="menu-builder__visual-editor-area">
      <MenuVisualEditor />
    </div>
  </div>
}