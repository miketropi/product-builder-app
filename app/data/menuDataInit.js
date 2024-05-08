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
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Double Bowl Sinks', 
        url: '#' 
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
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Brushed Gunmetal', 
        url: '#' 
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
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Gooseneck Mixers', 
        url: '#' 
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
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Filtered Water Taps', 
        url: '#' 
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
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Alma', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/ALMA.png?v=1715158386',
        url: '#' 
      },
      { 
        __key: uuidv4(),
        name: 'Art Australia', 
        image: 'https://cdn.shopify.com/s/files/1/0648/1071/3313/files/Art_Australia.png?v=1715158386',
        url: '#' 
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
    url: '#' 
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
    url: '#' 
  },
]