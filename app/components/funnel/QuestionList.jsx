import { Fragment } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { Icon, Button } from '@shopify/polaris';
import { DragHandleIcon, PlusIcon } from '@shopify/polaris-icons';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import StrictModeDroppable from '../menu-builder/StrictModeDroppable';

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "white",
});

const getItemStyle = (isDragging, isDraggingOver, draggableStyle) => ({
  ...draggableStyle
}); 

export default function QuestionList() {
  const { questions, setQuestions, editItem, setEditItem, fn } = useFunnelEditContext();
  const { onAddQuestion } = fn;

  const onReOrderQuestion = (result) => {
    const newIndex = result?.destination?.index;
    const oldIndex = result?.source?.index;

    let __questions = (questions ? [...questions] : []);
    const [removed] = __questions.splice(oldIndex, 1);
    __questions.splice(newIndex, 0, removed);

    setQuestions(__questions);
  }

  return <>
    {
      questions.length > 0 && 
      <DragDropContext onDragEnd={ onReOrderQuestion }>
        <StrictModeDroppable droppableId="droppable">
          {
            (provided, snapshot) => (
              <ul 
                className="__q-list"
                { ...provided.droppableProps }  
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}  
              >
                {
                  questions.map((q, __q_index) => {
                    const { __key, question } = q;
                    const isEdit = (__key == editItem?.__key ? true: false);
                    const classes = ['__q-item', (isEdit ? '__edit' : '')];

                    return <Draggable key={ __key } draggableId={ __key } index={ __q_index }>
                      {(provided, snapshot) => (
                        <li 
                          className={ classes.join(' ') } 
                          key={ __key } 
                          onClick={ e => setEditItem({ ...q }) }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          
                          style={getItemStyle(
                            snapshot.isDragging,
                            snapshot.isDraggingOver,
                            provided.draggableProps.style
                          )}
                        >
                          <span {...provided.dragHandleProps} >
                            <Icon source={ DragHandleIcon } />
                          </span>
                          <span className="__q-name" title={ question }>
                            { __q_index + 1 }. { question }
                          </span>
                        </li>
                      )}
                    </Draggable>
                  })
                }
                { provided.placeholder }
              </ul>
            )
          }
        </StrictModeDroppable>
      </DragDropContext>
    }
    
    <Button 
      icon={ PlusIcon } 
      variant="primary" 
      size="large" 
      fullWidth 
      onClick={ e => onAddQuestion() }>Add Question</Button>
  </>
}