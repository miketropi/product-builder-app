import { useState, useEffect, Fragment, useCallback } from 'react';
import {
  Page, BlockStack, Layout, FullscreenBar, Text, ButtonGroup, Button
} from "@shopify/polaris";
import VariantItem from './edit-components/VariantItem';
import VariantConfigBox from './edit-components/VariantConfigBox';
import { useProductBuilderContext } from '../context/ProductBuilderContext';

export default function EditBuilder({ productObject, editItem }) {
  // console.log([productObject, editItem]);
  const { API_FA } = useProductBuilderContext();
  const [ builderData, setBuilderData ] = useState([]);
  const [ editItemID, setEditItemID ] = useState('');
  const [ editObject, setEditObject ] = useState();
  const [ _productBuilderEditID, set_productBuilderEditID ] = useState('');

  useEffect(() => {
    // setEditItemID(editItem);
  }, [editItem])

  const __getProductBySID = async(ID, callback) => {
    try{
      const res = await API_FA.current.getProductBuilderBySID(ID);
      callback(res)
    } catch(err) {
      console.log(err);
      callback('')
    }
  }

  useEffect(() => {
    if(!productObject?.variants) return;
    __getProductBySID(productObject?.id, (res) => {
      
      if(res) {
        // console.log('aaaaa', res)
        const { _id, builder_design_data } = res;
        setBuilderData(builder_design_data);
        set_productBuilderEditID(_id);
        setEditItemID(editItem);
        return;
      }

      setBuilderData([...productObject.variants.edges].map(({ node }) => {
        node.builderData = {
          __config: {
            enable: true,
          },
          __options: []
        }
        return node;
      }));

      setEditItemID(editItem);
    })
  }, [productObject])

  useEffect(() => {
    if(!editItemID) return;
    let __builderData = [...builderData];
    setEditObject(__builderData.find(i => { return i.id == editItemID }));
  }, [editItemID])

  const onSave = async () => {
    console.log('onSave called');
    // console.log(productObject);
    // console.log(builderData);
    const { id } = productObject;
    const pushData = {
      "status": true,
      "store_id": "__test__buildmat_builder_store__",
      "product_id": id,
      "builder_design_data": builderData,
    }

    if(_productBuilderEditID) {
      pushData._id = _productBuilderEditID;
    }

    const res = await API_FA.current.saveProducrBuilderData(pushData);
    console.log(res);
  }

  const onBackScreen = useCallback(() => {
    alert('back');
  }, [])

  const fullscreenBarMarkup = (
    <FullscreenBar onAction={ onBackScreen }>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <Text variant="headingLg" as="p">
            { `Product: ${ productObject?.title }` }
          </Text>
        </div>
        <ButtonGroup>
          <Button variant="primary" onClick={ e => onSave() }>
            Save
          </Button>
        </ButtonGroup>
      </div>
    </FullscreenBar>
  )

  return <Page>
    {/* <ui-title-bar title={ `Product: ${ productObject?.title }` }>
      <button variant="primary" onClick={ e => onSave() }>Save</button>  
    </ui-title-bar> */}
    { fullscreenBarMarkup } 
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
              {/* { _productBuilderEditID } */}
              {/* { JSON.stringify(builderData) } */}
              {
                editObject &&
                <>
                  <VariantConfigBox variant={ editObject } onChange={ data => {
                    console.log(data);
                    setEditObject({ ...editObject, __options: editObject.editObject })
                  } } />
                </>
              }
            </div>
          </div>
        </Layout.Section>
      </Layout>
    </BlockStack>
  </Page>
}