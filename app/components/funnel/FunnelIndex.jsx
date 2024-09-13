import { useFunnelContext } from "../../context/FunnelContext";
import { Button, ButtonGroup, BlockStack, Layout, LegacyCard } from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";
import PbTable from '../PbTable';
import Paginate from "../Paginate";

export default function FunnelIndex() {
  const navigate = useNavigate();
  const { funnelItems, funnelMeta, currentPage, fn } = useFunnelContext();
  const { onDeleteItem, onUpdatePaged, onDuplicateItem } = fn;
  return <BlockStack gap="500">
    <Layout>
      <Layout.Section> 
        <LegacyCard>
          <PbTable
            headings={[ 
              'ID',
              'Funnel Name',
              'Status',
              ''
            ]}

            rows={ funnelItems.map(i => {
              const { _id, title, status } = i;
              return [
                _id, 
                title, 
                (status ? 'Published' : ''), 
                <ButtonGroup>
                  <Button url={ `/app/funnel/${ _id }` }>Edit</Button>
                  <Button onClick={ e => { onDuplicateItem(i) } }>Duplicate</Button>
                  <Button variant="primary" tone="critical" onClick={ e => {
                    let r = confirm('Are you sure you want to delete this funnel?');
                    if(!r) return;
                    
                    onDeleteItem(_id);
                  } }>Delete</Button>
                </ButtonGroup>]
            }) }
          />
        </LegacyCard>       
        {
          funnelMeta?.total && Math.ceil(funnelMeta?.total / 20) > 1 && 
          <Paginate currentPage={ currentPage } maxPages={ Math.ceil(funnelMeta?.total / 20) } onSelectPage={ num => {
            onUpdatePaged(num)
          } } />
        }
        
      </Layout.Section> 
    </Layout>
  </BlockStack>
}