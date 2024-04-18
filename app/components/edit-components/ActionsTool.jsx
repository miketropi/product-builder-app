import { Fragment } from "react";
import { useProductBuilderContext } from "../../context/ProductBuilderContext";
import { Button, Popover, ActionList, Frame, Modal, TextContainer } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { ExportIcon, ImportIcon } from '@shopify/polaris-icons';
import copy from 'copy-to-clipboard'; 

export default function ActionsTool() {
  const { editProduct } = useProductBuilderContext();
  const { editProduct__editObject, editProduct__onImport_Fn } = editProduct;
  const [ active, setActive ] = useState(false);

  const [ exportModalActive, setExportModalActive ] = useState(false);
  const [ importModalActive, setImportModalActive ] = useState(false);
  const [ importString, setImportString ] = useState('');

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleImportedAction = useCallback(
    () => {
      setImportString('')
      setImportModalActive(true);
    },
    [],
  );

  const handleExportedAction = useCallback(
    () => {
      setExportModalActive(true);
      // console.log(editProduct__editObject?.builderData); 
    },
    [],
  );

  const activator = (
    <Button onClick={toggleActive} disclosure>
      Actions
    </Button>
  );
  
  const exportModalTemp = (
    <Modal
      open={ exportModalActive }
      onClose={ e => { setExportModalActive(false) } }
      title={ `Export Data - ${ editProduct__editObject?.displayName }` }
      primaryAction={{
        content: 'Copy to clipboard',
        onAction: e => {
          copy(JSON.stringify(editProduct__editObject?.builderData, null, 4));
          setExportModalActive(false)
        },
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: e => { setExportModalActive(false) },
        },
      ]}
    >
      <Modal.Section>
        <div>
          <textarea 
            className="textarea-import-export"
            value={ JSON.stringify(editProduct__editObject?.builderData, null, 4) }
            readOnly></textarea>
        </div>
      </Modal.Section>
    </Modal>
  )

  const importModalTemp = (
    <Modal
      open={ importModalActive }
      onClose={ e => { setImportModalActive(false) } }
      title={ `Import Data - ${ editProduct__editObject?.displayName }` }
      primaryAction={{
        content: 'Import Data',
        onAction: e => {
          // copy(JSON.stringify(editProduct__editObject?.builderData, null, 4));
          editProduct__onImport_Fn(JSON.parse(importString));
          setImportModalActive(false); 
        },
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: e => { setImportModalActive(false) },
        },
      ]}
    >
      <Modal.Section>
        <div>
          <textarea 
            className="textarea-import-export"
            placeholder={ `Enter content import here...!` }
            value={ importString }
            onChange={ e => setImportString(e.target.value) }
          ></textarea>
        </div>
      </Modal.Section>
    </Modal>
  ) 

  return <>
    {/* { console.log(editProduct__editObject?.displayName) } */}
    <Popover 
      active={active}
      activator={activator}
      autofocusTarget="first-node"
      onClose={toggleActive}
    >
      <ActionList
        actionRole="menuitem"
        sections={ [
          {
            title: 'Export / Import Config',
            items: [
              { 
                content: `Import - ${ editProduct__editObject?.displayName }`, 
                icon: ImportIcon, 
                onAction: handleImportedAction 
              },
              { 
                content: `Export - ${ editProduct__editObject?.displayName }`, 
                icon: ExportIcon, 
                onAction: handleExportedAction 
              },
            ],
          },
        ] }
      />
    </Popover>
    { exportModalTemp }
    { importModalTemp }
  </>
}