import { useMenuBuilderContext } from "../../context/MenuBuilderContext";

export default function MenuBuilderEditor() {
  const { menuBuilderData } = useMenuBuilderContext(); 

  return <div className="menu-builder__editor">
    { JSON.stringify(menuBuilderData) }   
  </div>
} 