import { Button } from "@shopify/polaris";
import Heading from "../Heading";
import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2";
import { useNavigate } from "@remix-run/react";

export default function MenuHeaderEdit({ menu_id }) {
  const navigate = useNavigate();
  const { editFn, isSaving } = useMenuBuilderContextV2();
  const { save_Fn } = editFn;

  return <Heading 
    backButtonEnable={ true }
    title={ 'Menu Builder' } 
    backFn={ e => {
      navigate("/app/menu-builder")
    } } 
    buttons={ [
      <Button variant="primary" onClick={ save_Fn } loading={ isSaving }>
        { menu_id == 'new' ? 'Create Menu' : 'Update Menu' } 
      </Button>
    ] } 
  />
}