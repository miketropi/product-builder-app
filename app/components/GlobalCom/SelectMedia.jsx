import { Button, Frame, Modal, LegacyCard, ResourceList, ResourceItem, Thumbnail, Text, Badge, Spinner, Filters } from '@shopify/polaris';
import { ImageIcon } from '@shopify/polaris-icons';
import { useState, useCallback, useRef, useEffect } from 'react';

export default function SelectMedia({ title, onSelect }) {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // const handleChange = useCallback(() => setActive(!active), [active]);

  useEffect(() => {
    if(active == false) return;
    if(active === true) { 
      setSelectedItems([])
    }

    onLoadMedia(searchText, (media) => {
      setLoading(true); 
      setImages(media?.data?.files?.edges);
      setLoading(false);
    })
  }, [active, searchText])

  const activator = <Button onClick={ e => { setActive(true) } } icon={ ImageIcon }></Button>;

  return <div className="select-media__comp">
    <Modal
      activator={ activator }
      open={ active }
      onClose={ () => { setActive(false) } }
      title={ title }
      primaryAction={{
        content: 'Select',
        disabled: (selectedItems.length === 0 ? true : false),
        onAction: () => {
          onSelect(selectedItems);
          setActive(false)
        },
      }} 
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => { setActive(false) },
        },
      ]}
    >
      <Modal.Section>
        {
          <ImageSelectList 
          searchText={ searchText }
          onSearchChange={ value => {
            console.log(value)
            setSearchText(value);
          } }
          loading={ loading }
          images={ images.filter(i => i?.node?.id).map(i => {
            i.node.id = i.node.image.originalSrc; 
            return i.node; 
          }) }   
          selectedItems={ selectedItems } 
          onSelectionChange={ (e) => {
            return setSelectedItems(e)
          } } />
        }
      </Modal.Section> 
    </Modal>
  </div>
}

const ImageSelectList = ({ loading, searchText, onSearchChange, images, selectedItems, onSelectionChange }) => {
  return <LegacyCard>
    <Filters
      queryValue={ searchText }
      queryPlaceholder="Search image"
      filters={ [] }
      appliedFilters={ [] }
      onQueryChange={ onSearchChange }
      // onQueryClear={ _fn }
      // onClearAll={ _fn }
    />
    <ResourceList
      loading={ loading }
      items={ images }
      showHeader={ false }
      selectable
      onSelectionChange={ onSelectionChange }
      selectedItems={ selectedItems }
      renderItem={ (item) => {
        const { createdAt, id, image, mimeType, originalSource } = item;
        const thumb = (<Thumbnail
          source={ image?.originalSrc }
          alt={ '' }
        />)
        const fileName = image?.originalSrc.split('/').pop().split('.').shift();
        const fileSize = parseFloat(parseInt(originalSource?.fileSize) / 1024 / 1024).toFixed(2);
        
        return <ResourceItem
          id={ image?.originalSrc } 
          media={ thumb }
        >
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            { fileName }
          </Text>
          <div style={{ marginTop: '.3em' }}>
            <Badge tone="info">{ fileSize } Mb</Badge> { ' ' }
            <Badge>{ mimeType }</Badge> { ' ' }
            <Badge>{ createdAt }</Badge>
          </div>
        </ResourceItem>
      } }
    />
  </LegacyCard>
}

const onLoadMedia = async (searchText, callback) => {
  const res = await fetch('shopify:admin/api/graphql.json', {
    method: 'POST',
    body: JSON.stringify({
      query: `
      query getFiles($searchText: String) {
        files(first:20, query: $searchText) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              ... on MediaImage {
                id
                createdAt
                mimeType
                originalSource {
                  fileSize
                }
                image {
                  id
                  originalSrc: url
                  width
                  height
                }
              }
            }
          }
        }
      }
      `,
      variables: { searchText },
    }),
  });
  
  const media = await res.json();
  callback(media);
}