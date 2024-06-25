import QTextField from "./funnel/fields/QTextField";
import QSingleChoice from "./funnel/fields/QSingleChoice";
import QMultipleChoice from "./funnel/fields/QMultipleChoice";

const __COMPONENTS = {
  QTextField,
  QSingleChoice,
  QMultipleChoice
}

export default function DynamicComponent(props) {
  const { c } = props;
  if(!__COMPONENTS[c]) return <div>Not support { c } field!</div>
  const Comp = __COMPONENTS[c];
  return <Comp { ...props } />
}; 