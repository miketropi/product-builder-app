import { useState, useEffect } from 'react';

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
            { JSON.stringify(images) }
            <img src={ images?.nodes[0]?.url } alt="#" />
          </div>
          <div className="list-products__item-entry">
            <h4>{ title }</h4>
          </div>
        </div>
      })
    }
  </div>
}