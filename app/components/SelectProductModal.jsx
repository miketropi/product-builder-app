import { 
  Button, 
  Frame, 
  Modal, 
  TextContainer,
  FormLayout, 
  TextField, 
  Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import { Form, useSubmit } from "@remix-run/react";
import { useState, useCallback } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';
import ListProducts from './ListProducts';

export default function SelectProductModal({ open, onClose, onHandle }) {
  const { actionData, productCurrentID, setProductCurrentID } = useProductBuilderContext();
  const [ searchText, setSearchText ] = useState('');
  const submit = useSubmit();

  return <Modal
    open={ open }
    onClose={ onClose }
    title="Search & Select a Product for Builder"
    primaryAction={{ 
      content: 'Choose Product', 
      onAction: e => { onHandle(productCurrentID) }, 
      disabled: productCurrentID ? false : true }}
    secondaryActions={[
      { content: 'Cancel', onAction: onClose, },
    ]}
  >
    <Modal.Section>
      <FormLayout>
        <Form method="POST" onChange={(event) => {
            submit(event.currentTarget);
          }}
        >
          <TextField 
            prefix={ <Icon source={ SearchIcon } /> }
            label="Search Product" 
            type="text" 
            name="search_text" 
            value={ searchText } 
            onChange={ value => setSearchText(value) } 
            autoComplete="off" />
          <input type="hidden" name="__action" value="SEARCH_SHOPIFY_PRODUCTS" />
        </Form>
      </FormLayout>
      {
        actionData?.shopifyProducts &&
        <ListProducts 
          products={ actionData.shopifyProducts } 
          value={ productCurrentID }
          onSelect={ id => {
            // console.log(id);
            let __ID = (productCurrentID == id ? '' : id)
            setProductCurrentID(__ID);
          } } />
      }
    </Modal.Section>
  </Modal>
}