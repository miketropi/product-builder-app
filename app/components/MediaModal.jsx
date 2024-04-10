import { 
  Button, 
  Frame, 
  Modal, 
  TextContainer, 
  LegacyCard, 
  ResourceList, 
  ResourceItem, 
  Thumbnail,
  Text, 
  Filters,
  Badge} from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import { useProductBuilderContext } from '../context/ProductBuilderContext';

export default function MediaModal() {
  const [ searchText, setSearchText ] = useState('');
  const [ items, setItems ] = useState([]);
  const { mediaModal } = useProductBuilderContext();
  const { 
    mediaActive, setMediaActive, 
    mediaSelected, setMediaSelected,
    onSelectMedia_Fn,
    onLoadMedia_Fn } = mediaModal;
  
  const loadMedia = async (s = '') => {
    const { data } = await onLoadMedia_Fn(s);
    // console.log(data);
    setItems( data?.files?.edges )
  }

  useEffect(() => {
    // setMediaSelected([1,2,3])
    loadMedia();
  }, [])

  const _onSelect = useCallback(() => {
    setMediaActive(false);
    let __mediaSelected = [ ...mediaSelected ]
    onSelectMedia_Fn.current( __mediaSelected );
    setMediaSelected([]);
  }, [mediaSelected])

  const _onClose = useCallback(() => {
    // setMediaSelected([]);
    setMediaActive(false);
  }, [])

  const resourceName = {
    singular: 'image',
    plural: 'images',
  };

  const onUpdateSearchText_fn = useCallback((value) => {
    setSearchText(value);
  }, [])

  const onSelectMedia = useCallback((value) => {
    setMediaSelected(prevState => {
      let item = value.pop()
      return item ? [item] : []
    })
  })

  useEffect(() => {
    loadMedia(searchText)
  }, [searchText])

  return <Frame>
    <Modal
      open={ mediaActive }
      onClose={ _onClose }
      title="Select Image(s)"
      primaryAction={{
        content: 'Select',
        onAction: _onSelect,
        disabled: (mediaSelected.length == 0 ? true : false)
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: _onClose,
        },
      ]}
    >
      <Modal.Section>
        <LegacyCard>
          <Filters
            queryValue={ searchText }
            queryPlaceholder="Search image"
            filters={ [] }
            appliedFilters={ [] }
            onQueryChange={ onUpdateSearchText_fn }
            // onQueryClear={ _fn }
            // onClearAll={ _fn }
          />
          <ResourceList 
            resourceName={ resourceName }
            items={ items }
            selectable={ true }
            selectedItems={ mediaSelected }
            onSelectionChange={ onSelectMedia }
            showHeader={ false }
            renderItem={ (_item, _i_index) => {
              const { createdAt, id, image, mimeType, originalSource } = _item.node;
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
      </Modal.Section>
    </Modal>
  </Frame>
}