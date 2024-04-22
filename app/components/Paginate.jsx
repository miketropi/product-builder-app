export default function Paginate({ currentPage, maxPages, onSelectPage }) {
  return <div className="pb__paginate">
    {
      Array.from({length: maxPages}, (_, i) => {
        const pageNumber = (i + 1);
        const classes = pageNumber == currentPage ? '__current__' : '';

        if(classes == '__current__') {
          return <span
            key={ `__paginate-${ i }` } 
            className={ ["pb__paginate-item", classes].join(' ') } 
          >
            {
              pageNumber
            }
          </span>
        }

        return <a 
          key={ `__paginate-${ i }` } 
          className={ ["pb__paginate-item", classes].join(' ') } 
          onClick={ e => {
            onSelectPage(pageNumber)
          } }>
          {
            pageNumber
          }
        </a>
      })
    }
  </div>
}