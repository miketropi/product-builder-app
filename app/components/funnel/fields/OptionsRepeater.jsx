import { Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TextField, Text, Icon, Button } from '@shopify/polaris';
import { DragHandleIcon, DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import StrictModeDroppable from "../../menu-builder/StrictModeDroppable";

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "white",
});

const getItemStyle = (isDragging, isDraggingOver, draggableStyle) => ({
  ...draggableStyle
});

export default function OptionsRepeater(props) {
  const { label, options, optionsStyle, onChange, onDelete, onAdd, onOrder } = props;

  const onDragEnd = (result) => {
    // console.log(result)
    onOrder(result?.destination?.index, result?.source?.index)
  }

  const extraForStyle = {
    card: (o, __o_index) => {
      return <>
        <fieldset className="__q-fieldset">
          <legend>Extra fields ({ optionsStyle })</legend>
          <div className="__q-field-config-container">
            <TextField
              label="Card Title: "
              value={ o?.extra__cart_title ?? '' }
              onChange={ v => { onChange(v, 'extra__cart_title', __o_index) } }
              autoComplete="off"
            />

            <TextField
              label="Card Description: "
              value={ o?.extra__cart_desc ?? '' }
              onChange={ v => { onChange(v, 'extra__cart_desc', __o_index) } }
              autoComplete="off"
            />

            <TextField
              label="Card Image: "
              value={ o?.extra__cart_image ?? '' }
              onChange={ v => { onChange(v, 'extra__cart_image', __o_index) } }
              autoComplete="off"
            />
          </div>
        </fieldset>
      </>
    },
    block: (o, __o_index) => {
      return <>
        <fieldset className="__q-fieldset">
          <legend>Extra fields ({ optionsStyle })</legend>
          <div className="__q-field-config-container">
            <TextField
              label="Block Text: "
              value={ o?.extra__block_text ?? '' }
              onChange={ v => { onChange(v, 'extra__block_text', __o_index) } }
              autoComplete="off"
            />

            <TextField
              label="Block Image: "
              value={ o?.extra__block_image ?? '' }
              onChange={ v => { onChange(v, 'extra__block_image', __o_index) } }
              autoComplete="off"
            />
          </div>
        </fieldset>
      </>
    },
    custom_html: (o, __o_index) => {
      return <>
        <fieldset className="__q-fieldset">
          <legend>Extra fields ({ optionsStyle })</legend>
          <div className="__q-field-config-container">
            <TextField
              label="Custom HTML: "
              multiline={ 4 }
              value={ o?.extra__custom_html ?? '' }
              onChange={ v => { onChange(v, 'extra__custom_html', __o_index) } }
              autoComplete="off"
            />
          </div>
        </fieldset>
      </>
    },
  }

  return <fieldset className="__q-fieldset options-repeater-comp">
    <legend>{ label }</legend>
    <DragDropContext onDragEnd={ onDragEnd }>
      <StrictModeDroppable droppableId="droppable">
        {
          (provided, snapshot) => (
            <ul 
              {...provided.droppableProps}  
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              className="option-list"
            >
              {
                options && options.length > 0 &&
                options.map((o, __o_index) => {
                  const { __key, value, label } = o;
                  return (
                    <Draggable key={ __key } draggableId={ __key } index={ __o_index }>
                      {(provided, snapshot) => (
                        <li 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          
                          style={getItemStyle(
                            snapshot.isDragging,
                            snapshot.isDraggingOver,
                            provided.draggableProps.style
                          )}
                          className="option-item"
                        >
                          <div className="option-item__default">
                            <span className="__drag-item" {...provided.dragHandleProps}><Icon source={ DragHandleIcon } /></span>
                            <div className="__order-number"><span>{ __o_index + 1 }</span></div>
                            <TextField
                              value={ value }
                              onChange={ v => {
                                onChange(v, 'value', __o_index)
                              } }
                              prefix="Value: "
                              autoComplete="off"
                            />
              
                            <TextField
                              value={ label }
                              onChange={ v => {
                                onChange(v, 'label', __o_index)
                              } }
                              prefix="Label: "
                              autoComplete="off"
                            />
              
                            <span className="__remote-item" onClick={ e => { onDelete(__o_index) } }>
                              <Icon  
                                source={ DeleteIcon } 
                                tone="critical" />
                            </span>
                          </div>
                          {
                            extraForStyle[optionsStyle] 
                              ? <div className="option-item__extra">{ extraForStyle[optionsStyle](o, __o_index) }</div> 
                              : ''
                          }
                        </li>
                      )}
                    </Draggable>
                  )
                })
              }
              { provided.placeholder }
            </ul>
          )
        }
      </StrictModeDroppable>
    </DragDropContext>
    <Button 
      icon={ PlusIcon } 
      onClick={ e => {
        onAdd()
      } }>
      Add Item
    </Button>
  </fieldset>
}