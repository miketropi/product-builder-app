import { useCallback } from "react";
import MenuEditItem from "./MenuEditItem";
import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2"; 
import { TextField } from '@shopify/polaris';

export default function Sidebar() {
  const { currentItemEdit, menuTitle, setMenuTitle } = useMenuBuilderContextV2();

  const onChangeTitle = (value) => {
    setMenuTitle(value)
  }

  return <div className="__sidebar">
    {/* { showAllSub } */}
    <fieldset className="fieldset-field-ui">
      <legend>Menu Title</legend>
      <TextField
        value={ menuTitle }
        onChange={ onChangeTitle }
        autoComplete="off"
      />
    </fieldset>
    {
      currentItemEdit && <MenuEditItem />
    }
  </div>
}