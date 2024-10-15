export default class FunnelProxyApiHelper {
  __graphql = null

  constructor(graphql) {
    this.__graphql = graphql;
  }

  async QCollectionChoice__OptionsFilter(opts, filters) {
    return Promise.all(opts.map(async o => {
      const { __c_handle } = o;
      return new Promise( async (resolve, reject) => {
        
        const query_str = `query FunnelFilterByCollection($handle: String!) {
          collection(handle:$handle) {
            title
            id
            handle
            products(first: 2) {
              edges {
                node{
                  title
                  id
                  handle
                }
              }
            }
          }
        }`;

        const res = await this.__graphql(query_str, {
          variables: {
            handle: __c_handle,
          }
        });

        const coll = await res.json();
        if(coll?.data?.collection?.products?.edges.length <= 0) {
          o.disable = true; 
        } else {
          o.disable = false;
          o.__products = coll?.data?.collection?.products; 
        }
        
        resolve(o);   
      })
    }))
  }

  /**
   * 
   * @param {*} oldFilter 
   * @param {*} moreFilter 
   * 
   * oldFilter
    [
      {
        __key: '',
        type: 'collection',
        value: 'new-collection',
      },
      {
        __key: '',
        type: 'tag',
        value: 'Colour_Terrazzo',
      },
    ]
   */
  async findProductByFilter(oldFilter, moreFilter) {
    const self = this;
    const foundCollection =  oldFilter.find(oF => oF.type == 'collection');
    const foundNotCollection = oldFilter.filter(oF => oF.type != 'collection'); 
    // console.log('oldFilter', oldFilter);
    if(foundCollection) {
      // build query with collection filter 

      let filters = foundNotCollection.map(oF => ({[oF.type]: oF.value }));
      filters = [...filters, { [moreFilter.type]: moreFilter.value }];
      
      const res = await self.__graphql(`query($handle: String!, $filters: [ProductFilter!]) {
        collection(handle: $handle) {
          title
          handle
          products(first:10, filters:$filters) {
            edges {
              node {
                title
                id
                tags
              }
            }
          }
        }
      }`, {
        variables: {
          handle: foundCollection?.value,
          filters: filters,
        }
      })
      // console.log('filters', filters)
      const { data } = await res.json();
      return data?.collection?.products?.edges; 
    } else {
      // build query only filter products (tag, metafield, etc.)

      let __moreFilter = `${ moreFilter.type }:${ moreFilter.value }`;
      let __oldQueryFilter = `${ foundNotCollection.map(item => (`${item.type}:${item.value}`)) }`;

      const res = await self.__graphql(`query($query: String!){
        search(first: 2, types: PRODUCT, query: $query) {
          edges {
            node {
              ... on Product {
                title
                id
                handle
              }
            }
          }    
        }
      }`, {
        variables: {
          query: `${ __oldQueryFilter } ${ __moreFilter }`
        }
      });

      const { data } = await res.json();
      return data?.search?.edges;
    }
  }

  async QTagChoice__OptionsFilter(opts, filters = []) {
    const self = this;
    return Promise.all(opts.map(async o => {
      const { value, __key } = o;
      const __products = await self.findProductByFilter(filters, { 
        __key,
        type: 'tag',
        value,
      });

      if(__products && __products.length > 0) {
        o.disable = false;
        o.__products = __products; 
      } else {
        o.disable = true;
      } 

      return o;
    }));
  }

  async funnelOptionsFilter(args) {
    const { collectionHandle, field, filters } = args
    const { type, options } = field;

    // console.log(type, options);  

    switch (type) {
      case 'QCollectionChoice':
        return this.QCollectionChoice__OptionsFilter(options, filters);
        break;

      case 'QTagChoice':
        return this.QTagChoice__OptionsFilter(options, filters);

      default:
        return `Type "${ type }" Not support...!`
        break;
    }

    // return [type, options];
  }
}