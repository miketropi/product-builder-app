import { Popover, Button, Icon, Tooltip } from '@shopify/polaris';
import { useState, useEffect, useCallback } from 'react';
import { ImageIcon } from '@shopify/polaris-icons';
import { useProductBuilderContext } from '../context/ProductBuilderContext';

export default function PbSelectImage({ onSelect }) {
  const { mediaModal } = useProductBuilderContext();

  const openSelectMediaModal = useCallback( () => {
    mediaModal.mediaPicker(onSelect);
  }, [onSelect] );

  const activator = (
    <span className="__target" onClick={ openSelectMediaModal }>
      <Tooltip content={ `Select image` }>
        <Icon
          source={ImageIcon}
          tone="subdued"
        />
      </Tooltip>
    </span>
  );

  return <div className="pb-select-image-container">
    { activator }
  </div>
}