import { useMenuBuilderListContext } from "../../../context/MenuBuilderListContext"; 
import PbTable from "../../PbTable";
import { LegacyCard, Banner, Link, Button, ButtonGroup } from "@shopify/polaris";

export default function MenuBuilderTableList() {
  const { menuItems } = useMenuBuilderListContext();

  return <div className="menu-builder-table-list">
    {/* { JSON.stringify(menuItems) } */}
    {
      menuItems.length == 0 &&
      <Banner title="No item..." onDismiss={() => {}}>
        <p>Please click the button "Create Menu" to start.</p>
      </Banner>
    }
    {
      menuItems.length > 0 && 
      <LegacyCard>
        <PbTable
          headings={[ 
            'ID',
            'Menu Name',
            'Status',
            ''
          ]}

          rows={ menuItems.map(i => {
            const { _id, title, status } = i;
            return [
              _id, 
              title, 
              (status ? 'Published' : ''), 
              <ButtonGroup>
                <Button url={ `/app/menu-builder/${ _id }` }>Edit</Button>
                <Button variant="primary" tone="critical">Delete</Button>
              </ButtonGroup>]
          }) }
        />
      </LegacyCard>
    }
    
  </div>
}