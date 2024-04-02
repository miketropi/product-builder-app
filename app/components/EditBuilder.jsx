import { useState, useEffect, Fragment } from 'react';
import {
  Page, BlockStack, Layout
} from "@shopify/polaris";
import VariantItem from './edit-components/VariantItem';
import VariantConfigBox from './edit-components/VariantConfigBox';

export default function EditBuilder({ productObject, editItem }) {
  const [ builderData, setBuilderData ] = useState([]);
  const [ editItemID, setEditItemID ] = useState(editItem);

  useEffect(() => {
    if(!productObject?.variants) return;
    setBuilderData([...productObject.variants.edges].map(({ node }) => {
      node.builderData = {
        variantID: node.id,
        __config: {
          enable: true,
        },
        __options: []
      }
      return node;
    }));
  }, [productObject])

  return <Page>
    <ui-title-bar title={ `Product: ${ productObject?.title }` }>
      <button variant="primary">Save</button>  
    </ui-title-bar>
    <BlockStack>
      <Layout>
        <Layout.Section>
          <div className="edit-container">
            <div className="variants-list">
              {
                productObject.variants.edges.map(({ node }) => {
                  const { id } = node;
                  return <VariantItem 
                    key={ id } 
                    variant={ node } 
                    active={ id == editItemID ? true : false }
                    onSelect={ ({ id }) => {
                    setEditItemID(id);
                  } } />
                })
              }
            </div>
            <div className="config-container">
              {/* { JSON.stringify(builderData) } */}
              {
                builderData && 
                builderData.find(i => { return i.id == editItemID }) &&
                <>
                  <VariantConfigBox variant={ builderData.find(i => {
                    return i.id == editItemID
                  }) } onChange={ data => {
                    console.log(data);
                  } } />
                </>
              }
            </div>
          </div>
        </Layout.Section>
        {/* {
          JSON.stringify(productObject)
        }
        --- <br />
        {
          JSON.stringify(productObject.variants)
        } */}
        
      </Layout>
    </BlockStack>
  </Page>
}