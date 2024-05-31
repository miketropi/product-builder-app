import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useActionData, useNavigation, useSubmit } from "@remix-run/react";
import {
  Page,
  Layout,
  BlockStack,
  Banner
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import {
  MenuIcon
} from '@shopify/polaris-icons';

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }`,
    {
      variables: {
        input: {
          title: `${color} Snowboard`,
          variants: [{ price: Math.random() * 100 }],
        },
      },
    },
  );
  const responseJson = await response.json();

  return json({
    product: responseJson.data?.productCreate?.product,
  });
};

export default function Index() {
  const nav = useNavigation();
  const actionData = useActionData();
  const submit = useSubmit();
  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";
  const productId = actionData?.product?.id.replace(
    "gid://shopify/Product/",
    "",
  );

  useEffect(() => {
    if (productId) {
      shopify.toast.show("Product created");
    }
  }, [productId]);
  const generateProduct = () => submit({}, { replace: true, method: "POST" });

  return (
    <Page>
      
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Banner
              title="BM Insanity"
              action={{content: 'Product Builder', url: '/app/product-builder'}}
              secondaryAction={{content: 'Menu Builder', url: '/app/menu-builder' }}
              tone="info"
              onDismiss={() => {}} 
            >
              <p>Make product & menu for Buildmat Store.</p>
            </Banner>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
