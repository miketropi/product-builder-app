import { Button } from "@shopify/polaris";
import Heading from "../Heading";
import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2";

export default function MenuHeaderEdit({ menu_id }) {
  const { editFn } = useMenuBuilderContextV2();
  const { save_Fn } = editFn;

  return <Heading 
    backButtonEnable={ true }
    title={ 'Menu Builder' } 
    backFn={ e => {
      console.log('back...!')
    } } 
    buttons={ [
      <Button variant="primary" onClick={ save_Fn }>{
        menu_id == 'new' ? 'Create Menu' : 'Update Menu'
      }</Button>
    ] } 
  />
}