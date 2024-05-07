import { v4 as uuidv4 } from 'uuid';

const megaShopChildren = [
  {
    __key: uuidv4(),
    name: 'Kitchen Sinks',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
  },
  {
    __key: uuidv4(),
    name: 'Kitchen Mixers & Tapware',
    url: '#',
    type: '__MEGASHOP_SUBITEM__',
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
    url: '#' 
  },
  { 
    __key: uuidv4(),
    name: 'By Colour', 
    url: '#' 
  },
]