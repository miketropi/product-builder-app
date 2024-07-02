import { useCallback, Fragment, useRef, useState, useEffect } from 'react';
import { useFunnelEditContext } from '../../context/FunnelEditContext';
import { Text, Icon, Badge, Modal, Button } from '@shopify/polaris';
import { QuestionCircleIcon, AlertCircleIcon } from '@shopify/polaris-icons';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { MentionsInput, Mention } from 'react-mentions'

const __inputStyle = {
  control: {
    backgroundColor: '#fff',
    // fontSize: 16,
    // fontWeight: 'normal',
  },

  '&multiLine': {
    control: {
      // fontFamily: 'monospace',
      minHeight: 60,
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent',
    },
    input: {
      padding: 9,
      border: '1px solid silver',
      borderRadius: '6px',
    },
  },

  '&singleLine': {
    display: 'inline-block',
    width: 180,

    highlighter: {
      padding: 1,
      border: '2px inset transparent',
    },
    input: {
      padding: 1,
      border: '2px inset',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'black',
      border: '1px solid black',
      borderRadius: '6px',
      // fontSize: 16,
    },
    item: {
      padding: '5px 15px',
      // borderBottom: '1px solid rgba(0,0,0,0.15)',
      color: 'white',
      borderRadius: '6px',
      '&focused': {
        backgroundColor: 'white', 
        color: 'black',
      },
    },
  },
}

const __mentionStyle = {
  backgroundColor: "#cee4e5",
}

const InputFlow = ({ value, onChange }) => {
  const { questions } = useFunnelEditContext();
  const [ text, setText ] = useState(value);
  const [ active, setActive ] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const activator = <Button onClick={handleChange}>Open</Button>;

  useEffect(() => {
    setText(value)
  }, [value])

  return <>
    <Modal
      title="Redirect URL"
      // titleHidden
      activator={ activator }
      open={ active }
      onClose={ handleChange }
      primaryAction={{
        content: 'Update',
        onAction: () => {
          onChange(text);
          setText(value);
          setActive(false);
        },
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: () => {
            setText(value);
            setActive(false);
          },
        },
      ]}
    >
      <Modal.Section>
        { value }
        <MentionsInput
          placeholder="Enter redirect URL..."
          value={ text }
          appendSpaceOnAdd={ true } 
          onChange={(e) =>
            setText( e.target.value ) 
          }
          style={ __inputStyle }
        >
          <Mention 
            trigger="@"
            markup={ `{%__id__%}` } 
            style={ __mentionStyle } 
            data={ questions.map((q, __q_index) => {
              const { __key, question } = q;
              return {
                id: __key,
                display: `${ __q_index + 1 }. Value of "${ question }"`,
              }
            }) } />
        </MentionsInput>
        { text }
        <div style={{ margin: `1em 0 7em` }}>
          <Text variant="bodyXs" as="p">
            Use '@' for question value
          </Text>
        </div>
      </Modal.Section>
    </Modal>
  </>
}

export default function RedirectNode({ id, data, isConnectable }) {
  const { flowDesign } = useFunnelEditContext();
  const { onUpdateNodeData_Flow } = flowDesign;

  return <div className="flow-node node-type__redirect">
    <div className="flow-node__heading">
      <Handle 
        type="target" 
        position={ Position.Left } 
        style={ { top: 30 } }
        isConnectable={ isConnectable } />
      <Text variant="headingXs" as="h6">
        Redirect URL
      </Text>
    </div>
    <div className="flow-node__entry">
      { JSON.stringify(data) } { id }
      <div className="nodrag">
        <InputFlow value={ data?.redirect_url } onChange={ value => { console.log(value) } } />
      </div>
    </div>
  </div>
}