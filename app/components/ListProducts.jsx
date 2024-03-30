import { useState, useEffect } from 'react';
import {LegacyStack, Badge} from '@shopify/polaris';

export default function ListProducts({ products, onSelect, value }) {

  return <div className="list-products">
    {
      products && 
      products.map(({ node }) => {
        const { id, title, images, variants } = node;
        const selected = (value == id ? true : false);
        return <div 
          key={ id } 
          className={ ['list-products__item', selected ? '__selected' : ''].join(' ') } 
          onClick={ e => onSelect(id) }>
          <div className="list-products__item-thumb">
            {/* { JSON.stringify(images) } */}
            <img src={ images?.nodes[0]?.url } alt="#" />
          </div>
          <div className="list-products__item-entry">
            <h4>{ title } (#{ id.replace('gid://shopify/Product/', '') })</h4>
            <div className="list-products__item-meta">
              <div className="__variants">
                Variant(s): 
                {
                  variants.edges.length > 0 && 
                  variants.edges.map(({ node }) => {
                    const { id, title, image, price } = node;
                    return <span key={ id }>{ title }</span>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      })
    }
  </div>
}