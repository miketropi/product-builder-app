import { useFunnelEditContext } from '../../context/FunnelEditContext';
import QuestionList from './QuestionList';
import QuestionDesign from './QuestionDesign';
import {Icon} from '@shopify/polaris';
import {
  DragHandleIcon
} from '@shopify/polaris-icons';

export default function BuildQuestions() {
  const { questions, editItem, setEditItem } = useFunnelEditContext();

  return <div className="build-questions-comp">
    <div className="build-questions-comp__list-items">
      <h4 className="heading">Questions</h4>
      <QuestionList />
    </div>
    <div className="__line"></div>
    <div className="build-questions-comp__design-area">
      <QuestionDesign />
    </div>
  </div>
}