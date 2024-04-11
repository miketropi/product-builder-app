import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../shopify.server";

export const links = () => [
  { rel: "stylesheet", href: polarisStyles },
];

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ 
    apiKey: process.env.SHOPIFY_API_KEY || "",
    APP_API_KEY: process.env.APP_API_KEY || "",
    APP_API_ENDPOINT: process.env.APP_API_ENDPOINT || "",
  });
};

export default function App() {
  const { apiKey, APP_API_KEY, APP_API_ENDPOINT } = useLoaderData();

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <ui-nav-menu>
        <Link to="/app" rel="home">
          Home
        </Link>
        {/* <Link to="/app/additional">Additional page</Link> */}
        <Link to="/app/product-builder">Product Builder</Link>
      </ui-nav-menu>
      <Outlet context={ { apiKey, APP_API_KEY, APP_API_ENDPOINT } } />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
