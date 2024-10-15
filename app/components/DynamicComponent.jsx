import QTextField from "./funnel/fields/QTextField";
import QSingleChoice from "./funnel/fields/QSingleChoice";
import QMultipleChoice from "./funnel/fields/QMultipleChoice";
import QCollectionChoice from "./funnel/fields/QCollectionChoice";
import QTagChoice from "./funnel/fields/QTagChoice";

const __COMPONENTS = {
  QTextField,
  QSingleChoice,
  QMultipleChoice,
  QCollectionChoice,
  QTagChoice, 
}

export default function DynamicComponent(props) {
  const { c } = props;
  if(!__COMPONENTS[c]) return <div>Not support { c } field!</div>
  const Comp = __COMPONENTS[c];
  return <Comp { ...props } />
}; 