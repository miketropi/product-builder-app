import { Fragment } from "react";
import {
  ButtonGroup,
  Button,
  FullscreenBar,
  Text,
  Spinner } from "@shopify/polaris";

export default function Heading({ title, buttons, backButtonEnable, className, backFn }) {
  return <div className={ ['heading-bar', className, (backButtonEnable ? '' : '__hide-back-button')].join(' ') }>
    <FullscreenBar onAction={ e => {
      backFn ? backFn.call() : ''
    } }>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{marginLeft: '1rem', flexGrow: 1}}>
          <Text variant="headingLg" as="p">
            { title }
          </Text>
        </div>
        {
          buttons &&
          buttons.length &&
          <ButtonGroup>
            {
              buttons.map((b, __b_index) => {
                return <Fragment key={ __b_index }>
                  { b }
                </Fragment>
              })
            }
          </ButtonGroup>
        }
      </div>
    </FullscreenBar>
  </div>
}