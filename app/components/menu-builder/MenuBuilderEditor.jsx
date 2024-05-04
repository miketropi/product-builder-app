import { useMenuBuilderContext } from "../../context/MenuBuilderContext";

export default function MenuBuilderEditor() {
  const { menuBuilderData } = useMenuBuilderContext(); 

  return <div className="menu-builder__editor">
    <textarea value={ JSON.stringify(menuBuilderData, null, 4) }></textarea>   
  </div>
} 