import { useState, useCallback, useEffect, useRef, Fragment } from "react";
import { useMenuBuilderContext } from "../../context/MenuBuilderContext";
import { produce } from "immer";
import { Icon, Button, Popover, ActionList, TextField } from '@shopify/polaris';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { deepSearch } from '../../libs/helpers';
import StrictModeDroppable from './StrictModeDroppable';
import MenuItemEditor from "./MenuItemEditor";
import _ from 'lodash';
import { 
  DragHandleIcon, 
  PlusIcon, 
  LinkIcon, 
  ProductAddIcon, 
  CollectionReferenceIcon, 
  PageAddIcon,
  CaretDownIcon,
  CaretUpIcon,
  XSmallIcon } from '@shopify/polaris-icons';

const { isEmpty } = _;

const __MENU_TYPES = [
  { content: 'Custom Link', icon: LinkIcon },
  { content: 'Product', icon: ProductAddIcon },
  { content: 'Collection', icon: CollectionReferenceIcon },
  { content: 'Page', icon: PageAddIcon },
];

export default function MenuVisualEditor() {
  const { 
    menuBuilderData, setMenuBuilderData,
    currentEditMenuItem, 
    setCurrentEditMenuItem, 
    setCurrentDragItem,
    groupItemDrag, setGroupItemDrag,
    newMenuItem_Fn, 
    onAddMenuItem_Fn, 
    onSelectEditMenuItem_Fn,
    getItemChildren_Fn } = useMenuBuilderContext(); 
  const [popoverActive, setPopoverActive] = useState(false);
  const [placeholderProps, setPlaceholderProps] = useState({});
  const queryAttr = "data-rbd-drag-handle-draggable-id";

  const activator = (
    <Button icon={ PlusIcon } disclosure onClick={ e => setPopoverActive(!popoverActive) }>
      Add menu item
    </Button>
  );

  const onAddMenuItem = (item) => {
    const newItem = newMenuItem_Fn(item.content)
    const newSubItem = newMenuItem_Fn(item.content, newItem.__key)
    const newSubItem2 = newMenuItem_Fn(item.content, newItem.__key)
    const newSubItem3 = newMenuItem_Fn(item.content, newItem.__key)
    const newSubItem4 = newMenuItem_Fn(item.content, newSubItem3.__key)

    setMenuBuilderData(produce((draft) => {
      draft.menuData.push(newItem, newSubItem, newSubItem2, newSubItem3, newSubItem4)
    }))

    setPopoverActive((popoverActive) => !popoverActive)
  }

  const getListStyle = (isDraggingOver) => ({
    position: "relative",
    background: isDraggingOver ? 'rgb(236 243 255)' : '#f9f9f9',
    border: `solid 1px ${ isDraggingOver ? 'rgb(236 243 255)' : '#f9f9f9' }`,
    borderRadius: '8px',
  });

  const getItemStyle = (draggableStyle, isDragging) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: '3px',
    
    // styles we need to apply on draggables
    ...draggableStyle
  });

  const getLevelByItem = (__key, lv = 0) => {
    let menu = menuBuilderData.menuData;
    let item = menu.find(i => (i.__key == __key));

    if(__key == null) return lv;

    let found = menu.find(i => (i.__key == item.parent));

    if(found) {
      lv += 1;
      return getLevelByItem(found.__key, lv);
    }

    return lv;
  }

  const handleDragStart = event => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }
    
    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      [...draggedDOM.parentNode.children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = curr.currentStyle || window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ), 
      level: getLevelByItem(event.draggableId)
    });
  };

  const handleDragUpdate = event => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...draggedDOM.parentNode.children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1)
    ];

    var clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    console.log(event)
    console.log(draggedDOM.getBoundingClientRect())
    
    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
      level: getLevelByItem(event.draggableId)
    });
  };

  const getDraggedDom = draggableId => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const onRenderNavVisualEditor_Fn = (navData, _parent = null, lv = 0) => {
    lv += 1
    return (
      [...navData].filter(i => (i.parent == _parent)).map((i, __i_index) => {
        const { __key, __type, name, url, parent } = i;
        const __active = (__key == currentEditMenuItem?.__key ? true : false);
        const __index = navData.indexOf(i);

        return !groupItemDrag.includes(__key) && <Fragment key={ __key }>
          <Draggable draggableId={ __key } index={ __index } >
            {
              (provided, snapshot) => {
                return (
                  <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps} 
                    {...provided.draggableProps}
                    style={getItemStyle(
                      provided.draggableProps.style,
                      snapshot.isDragging
                    )} 
                  >
                    <MenuItemEditor 
                      menu={ i } 
                      active={ __active }
                      onSelect={ menu => { onSelectEditMenuItem_Fn(menu) } }
                      level={ (lv - 1) } />
                    { provided.placeholder }
                  </div>
                )
              }
            }
          </Draggable>
          {
            onRenderNavVisualEditor_Fn(navData, __key, lv)
          }
        </Fragment>
      })
    )
  }

  return <div className="menu-builder__visual-editor">  
    <div style={{ marginTop: '2em' }}>
      <strong>Add menu items</strong>
      { 
        menuBuilderData?.menuData && 
        <div style={{ marginTop: '1em' }}>
          <DragDropContext 
            onBeforeCapture={ e=> {
              // console.log('onBeforeCapture', e);
              setCurrentDragItem(e?.draggableId);
              let arr = getItemChildren_Fn(e?.draggableId);
              // console.log(arr);
              setGroupItemDrag(arr);
            } }
            onBeforeDragStart={ e => {
              // console.log('onBeforeDragStart', e);
              // setCurrentDragItem(e?.draggableId);
            } }
            onDragStart={ e => {
              // console.log(e);
              handleDragStart(e);
            } } 
            onDragUpdate={ e => {
              console.log(e);
              handleDragUpdate(e);
            } }
            onDragEnd={ res => {
              setGroupItemDrag([]);
            } } 
          >
            <StrictModeDroppable droppableId={ `droppable` }>
              {
                (provided, snapshot) => {
                  return <div 
                    ref={ provided.innerRef } 
                    style={ getListStyle(snapshot.isDraggingOver) }
                    { ...provided.droppableProps }
                  >
                    { onRenderNavVisualEditor_Fn(menuBuilderData.menuData) }
                    { provided.placeholder }
                    {!isEmpty(placeholderProps) && snapshot.isDraggingOver && (
                      <div
                        className="drag__placeholder"
                        style={{
                          top: placeholderProps.clientY,
                          left: placeholderProps.clientX,
                          height: placeholderProps.clientHeight,
                          width: placeholderProps.clientWidth
                        }}
                      >
                        <div className="drag__placeholder-level" style={{ width: `calc(100% - ${ parseInt(placeholderProps.level) * 15 }px)` }}>{
                          placeholderProps.level
                        }</div>
                      </div>
                    )}
                  </div>
                }
              }
            </StrictModeDroppable>
          </DragDropContext>
        </div>
      }
    </div>
    
    <div style={{ marginTop: '1em' }}>
      <Popover
        active={ popoverActive }
        activator={ activator }
        autofocusTarget="first-node"
        onClose={ e => setPopoverActive(false) }
      >
        <Popover.Pane>
          <ActionList
            actionRole="menuitem"
            items={__MENU_TYPES.map(item => {
              return { ...item, onAction: () => onAddMenuItem(item) }
            })}
          />
        </Popover.Pane>
      </Popover> 
    </div>
    {/* { JSON.stringify(placeholderProps) } */}
  </div>     
} 