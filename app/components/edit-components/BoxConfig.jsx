export default function BoxConfig({ configData }) {
  return <div className="box-config">
    <label className="box-config__field">
      <span className="box-config__title">Name</span>
      <input type="text" value={ configData.name } onChange={ e => {} } />
    </label>
    <label className="box-config__field">
      <span className="box-config__title">Description</span>
      <textarea value={ configData.description } onChange={ e => {} }></textarea>
    </label>
    <div>
      <span className="box-config__title">Options</span>
      <div>{ JSON.stringify(configData.options) }</div>
    </div>
  </div>
}