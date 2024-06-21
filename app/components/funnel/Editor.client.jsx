import EditorJS from "@editorjs/editorjs";
import Header from '@editorjs/header'; 

export default function Editor() {
  const editor = new EditorJS({
    /**
     * Id of Element that should contain the Editor
     */
    holder: "editorjs",
    tools: { 
      header: Header
    }, 

    /**
     * Available Tools list.
     * Pass Tool's class or Settings object for each Tool you want to use
     */
  });
  return <div id="editorjs"></div>;
}