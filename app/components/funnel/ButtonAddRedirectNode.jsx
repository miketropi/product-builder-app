import { Button, Icon, ButtonGroup } from "@shopify/polaris";
import {
  ArrowDiagonalIcon, PlusIcon
} from '@shopify/polaris-icons';

export default function ButtonAddRedirectNode({ onClick }) {
  return <Button icon={ PlusIcon } onClick={ onClick } >Add Redirect Node</Button>
}