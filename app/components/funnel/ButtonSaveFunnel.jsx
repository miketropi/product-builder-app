import { Button } from "@shopify/polaris";
import { useFunnelEditContext } from "../../context/FunnelEditContext";

export default function ButtonSaveFunnel () {
  const { funnelID, isSave, fn } = useFunnelEditContext();
  const { onSave } = fn;

  return <Button variant="primary" loading={ isSave } onClick={ e => onSave() }>
    { (funnelID ? 'Update Funnel' : 'Create Funnel' ) }
  </Button>
}