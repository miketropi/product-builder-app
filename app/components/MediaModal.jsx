import { 
  Button, 
  Frame, 
  Modal, 
  TextContainer, 
  LegacyCard, 
  ResourceList, 
  ResourceItem, 
  Thumbnail,
  Text } from '@shopify/polaris';
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
  
  const loadMedia = async () => {
    const { data } = await onLoadMedia_Fn();
    // console.log(data);
    setItems( data?.files?.edges )
  }

  useEffect(() => {
    // setMediaSelected([1,2,3])
    loadMedia();
  }, [])

  const _onSelect = useCallback(() => {
    setMediaActive(false);
    onSelectMedia_Fn.current(mediaSelected);
  }, [])

  const _onClose = useCallback(() => {
    setMediaSelected([]);
    setMediaActive(false);
  }, [])

  return <Frame>
    <Modal
      open={ mediaActive }
      onClose={ _onClose }
      title="Select Image(s)"
      primaryAction={{
        content: 'Select',
        onAction: _onSelect,
      }}
      secondaryActions={[
        {
          content: 'Close',
          onAction: _onClose,
        },
      ]}
    >
      <Modal.Section>
        {/* { JSON.stringify(items) } */}
        <LegacyCard>
          <ResourceList 
            items={ items }
            renderItem={ (_item, _i_index) => {
              const { createdAt, id, image, mimeType, originalSource } = _item.node;
              const thumb = (<Thumbnail
                source={ image?.originalSrc }
                alt={ '' }
              />)
              const fileName = image?.originalSrc.split('/').pop();
              const fileSize = parseFloat(parseInt(originalSource?.fileSize) / 1024 / 1024).toFixed(2);

              return <ResourceItem
                id={ id }
                media={ thumb }
              >
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  { fileName }
                </Text>
                <div>{ mimeType }, { fileSize } Mb, { createdAt }</div>
              </ResourceItem>
            } }
          />
        </LegacyCard>
      </Modal.Section>
    </Modal>
  </Frame>
}