import { v4 as uuidv4 } from 'uuid';

const blockMenu = [
  {
    __key: uuidv4(),
    name: 'BY Configuration',
    url: '#',
    type: '__BLOCK_MENU__',
    children: [
      { 
        __key: uuidv4(),
        name: 'Single Bowl Sinks', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Double Bowl Sinks', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
    ]
  },
  {
    __key: uuidv4(),
    name: 'BY Colours',
    url: '#',
    type: '__BLOCK_MENU__',
    children: [
      { 
        __key: uuidv4(),
        name: 'Brushed Stainless Steel', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Gunmetal', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
    ]
  }
]

const blockMenu2 = [
  {
    __key: uuidv4(),
    name: 'KITCHEN Mixers',
    url: '#',
    type: '__BLOCK_MENU__',
    children: [
      { 
        __key: uuidv4(),
        name: 'Pull Out Mixers', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Gooseneck Mixers', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
    ]
  },
  {
    __key: uuidv4(),
    name: 'TAPWARE',
    url: '#',
    type: '__BLOCK_MENU__',
    children: [
      { 
        __key: uuidv4(),
        name: 'Water Filters', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Filtered Water Taps', 
        url: '#',
        type: '__BLOCK_MENU_ITEM__',
      },
    ]
  }
]

const megaShopChildren = [
  {
    __key: uuidv4(),
    name: 'Kitchen Sinks',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
    config: {
      background_image: 'https://images.unsplash.com/photo-1714399727269-7883d5d66da2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      custom_text: 'View All',
      custom_url: '#',
    },
    children: blockMenu
  },
  {
    __key: uuidv4(),
    name: 'Kitchen Mixers & Tapware',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
    config: {
      background_image: 'https://images.unsplash.com/photo-1714399727269-7883d5d66da2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      custom_text: 'View All',
      custom_url: '#',
    },
    children: blockMenu2,
  },
  {
    __key: uuidv4(),
    name: 'Laundry',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Tapware',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Basins',
    url: '#',
  },
  {
    __key: uuidv4(),
    name: 'Basin Mixers',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Shower Tapware',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Bathroom Accessories',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Door Hardware',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
]

const megaBrandChildren = [
  {
    __key: uuidv4(),
    name: '', 
    url: '',
    type: '__BLOCK_BRAND__',
    children: [
      { 
        __key: uuidv4(),
        name: 'ADP', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/ADP.png?v=1715158385',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Alma', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/ALMA.png?v=1715158386',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Art Australia', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Art_Australia.png?v=1715158386',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Carecover', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Carecover.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Castano', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Castano.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Johnson Suisse', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Johnson-Suisse.png?v=1715228247',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Joseph Joseph', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Joseph-Joseph.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Nero', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Nero.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Phoenix', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Phoenix.png?v=1715228247',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Puretec', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Puretec.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Thermogroup', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Thermogroup.png?v=1715228246',
        url: '#',
        type: '__BLOCK_BRAND_ITEM__',
      },
    ]
  }
]

const megaBlockMenuImage = [
  {
    __key: uuidv4(),
    name: 'INTREND COLOURS', 
    url: '#',
    type: '__BLOCK_MENU_IMAGE__',
    config: {
      containerSize: 'fullwidth', 
    },
    children: [
      { 
        __key: uuidv4(),
        name: 'Aged Brass', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Aged_Brass.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Brass Gold', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Brushed_Brass_Gold.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Gunmetal', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Brushed_Gunmetal.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Nickel', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Brushed_Nickel.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Stainless Steel', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Brushed_Stainless_Steel.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Vintage Antique Brass', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Brushed_Vintage_Antique_Brass.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Chrome', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Chrome.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Matte White', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Matte_White.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Stainless Steel', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Stainless_Steel.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Vintage Brass', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Vintage_Brass.png?v=1715393151',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
    ]
  },
  {
    __key: uuidv4(),
    name: 'Natural and Stone-Like', 
    url: '#',
    type: '__BLOCK_MENU_IMAGE__',
    config: {
      containerSize: 'small',
    },
    children: [
      { 
        __key: uuidv4(),
        name: 'Marble', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Marble.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Terrazzo', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Terrazzo.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
    ]
  },
  {
    __key: uuidv4(),
    name: 'Monochrome', 
    url: '#',
    type: '__BLOCK_MENU_IMAGE__',
    config: {
      containerSize: 'medium', 
    },
    children: [
      { 
        __key: uuidv4(),
        name: 'White', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/White.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Gloss White', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Gloss_White.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Matte Black', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Matte_Black.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Black', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Black.png?v=1715325948',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
    ]
  },
  {
    __key: uuidv4(),
    name: 'Specialized Finishes', 
    url: '#',
    type: '__BLOCK_MENU_IMAGE__',
    config: {
      containerSize: 'medium', 
    },
    children: [
      { 
        __key: uuidv4(),
        name: 'Champagne Pink', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Champagne_Pink.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Graphite', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Graphite.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Meteor Grey', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Meteor_Grey.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
      { 
        __key: uuidv4(),
        name: 'Sea Salt White', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Sea_Salt_White.png?v=1715325947',
        url: '#',
        type: '__BLOCK_MENU_IMAGE_ITEM__',
      },
    ]
  }
]

export const menuDataInit = [
  { 
    __key: uuidv4(),
    name: 'Shop All', 
    url: '#',
    type: '__MEGASHOP__',
    icon: 'HB',
    children: megaShopChildren
  },
  { 
    __key: uuidv4(),
    name: 'Best Sellers', 
    url: '#',
    children: [
      { 
        __key: uuidv4(),
        name: 'Best Sellers', 
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Kitchen Sinks', 
        url: '#' 
      },
    ]
  },
  { 
    __key: uuidv4(),
    name: 'Kitchen Sinks', 
    url: '#' 
  },
  { 
    __key: uuidv4(),
    name: 'By Room', 
    url: '#' 
  },
  { 
    __key: uuidv4(),
    name: 'Brands', 
    url: '#',
    type: '__MEGA__',
    children: megaBrandChildren,
  },
  { 
    __key: uuidv4(),
    name: 'By Colour', 
    url: '#',
    type: '__MEGA__',
    config: {
      container: true,
      container_padding: `20px`,
      container_bottom_custom_text: 'View All Colours',
      container_bottom_custom_url: '#',
    },
    children: megaBlockMenuImage
  },
]