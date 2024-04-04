export default function PbTable({ headings, rows }) {
  return <div className="pbtable-container">
    <table className="pbtable">
      <thead className="pbtable__head">
        <tr className="pbtable__tr">
          {
            headings.length > 0 && 
            headings.map((name, __h_index) => {
              return <th className="pbtable__th" key={ __h_index }>{ name }</th>
            })
          }
        </tr>
      </thead>
      <tbody className="pbtable__body">
        {
          rows.length > 0 && 
          rows.map((row, __r_index) => {
            return <tr key={ __r_index } className="pbtable__tr">
              {
                row.map((item, __i_index) => {
                  return <td key={ __i_index } className="pbtable__td">{ item }</td>
                })
              }
            </tr>
          })
        }
      </tbody>
    </table>
  </div>
}