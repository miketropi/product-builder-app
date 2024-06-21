import { Fragment } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { Icon, Button } from '@shopify/polaris';
import {
  DragHandleIcon,
  PlusIcon
} from '@shopify/polaris-icons';

export default function QuestionList() {
  const { questions, editItem, setEditItem, fn } = useFunnelEditContext();
  const { onAddQuestion } = fn;
  return <>
    {
      questions.length > 0 && 
      <ul className="__q-list">
        {
          questions.map((q, __q_index) => {
            const { __key, question } = q;
            const isEdit = (__key == editItem?.__key ? true: false);
            const classes = ['__q-item', (isEdit ? '__edit' : '')];
            return <li 
              className={ classes.join(' ') } 
              key={ __key } 
              onClick={ e => setEditItem({ ...q }) }>
              <Icon source={ DragHandleIcon } />
              <span className="__q-name" title={ question }>
                { __q_index + 1 }. { question }
              </span>
            </li>
          })
        }
      </ul>
    }
    
    <Button 
      icon={ PlusIcon } 
      variant="primary" 
      size="large" 
      fullWidth 
      onClick={ e => onAddQuestion() }>Add Question</Button>
  </>
}