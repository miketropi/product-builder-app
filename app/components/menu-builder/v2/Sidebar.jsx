import MenuEditItem from "./MenuEditItem";
import { useMenuBuilderContextV2 } from "../../../context/MenuBuilderContextV2"; 

export default function Sidebar() {
  const { currentItemEdit, showAllSub } = useMenuBuilderContextV2();
  return <div className="__sidebar">
    {
      showAllSub
    }
    {
      currentItemEdit && <MenuEditItem />
    }
  </div>
}