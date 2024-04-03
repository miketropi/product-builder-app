export default function BoxConfig({ configData, onChange }) {

  const onUpdateField = (value, name) => {
    onChange(value, name);
  }

  return <div className="box-config">
    <fieldset>
      <legend>{ configData.name }</legend>

      <label className="box-config__field">
        <span className="box-config__title">Name</span>
        <input 
          type="text" 
          value={ configData.name } 
          onChange={ e => {
            onUpdateField(e.target.value, 'name')
          } } />
      </label>
      <label className="box-config__field">
        <span className="box-config__title">Description</span>
        <textarea 
          value={ configData.description } 
          onChange={ e => {
            onUpdateField(e.target.value, 'description')
        } }></textarea>
      </label>
      <div className="box-config__repeater">
        <fieldset>
          <legend>Options</legend>
          <div>{ JSON.stringify(configData.options) }</div>
        </fieldset>
      </div>
    </fieldset>
  </div>
}