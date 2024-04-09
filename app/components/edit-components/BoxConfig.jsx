import PbButton from '../PbButton';
import PbSelectImage from '../PbSelectImage';

export default function BoxConfig({ configData, onChange, onDelete }) {
  const onUpdateField = (value, name) => {
    onChange(value, name);
  }

  const onAddMoreOption = () => {
    let __o = [...configData.options];
    const rand = (Math.random() + 1).toString(36).substring(7);
    __o.push({
      __key: `__${ rand }`,
      name: '',
      image: '',
    });

    onUpdateField(__o, 'options');
  }

  const onRemoveOptionItem = (index) => {
    let __o = [...configData.options];
    __o.splice(index, 1);
    onUpdateField(__o, 'options');
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
          <div className="group-option">
            {/* { JSON.stringify(configData.options) } */}
            {
              configData.options && 
              configData.options.map((o, __o_index) => {
                return <div className="group-option__item" key={ __o_index }>
                  <PbButton 
                    text={ '✕' } 
                    classes={ '__close' } 
                    title={ 'Remove item' } 
                    onClick={ e => {
                      let r = confirm('Are you sure you want to remove?')
                      if(!r) return;
                      
                      onRemoveOptionItem(__o_index);
                    } } />
                  <label>
                    <span>Name</span>
                    <input type="text" value={ o.name } onChange={ e => {
                      onUpdateField(e.target.value, `options[${ __o_index }].name`)
                    } } />
                  </label>
                  <label>
                    <span>Image URl</span>
                    <input type="text" value={ o.image } onChange={ e => {
                      onUpdateField(e.target.value, `options[${ __o_index }].image`)
                    } } />
                    <PbSelectImage onSelect={ (media) => {
                      onUpdateField(JSON.stringify(media), `options[${ __o_index }].image`);
                    } } />
                  </label>
                </div>
              })
            }

            <PbButton text={ '+ Add More' } classes={ '__small' } onClick={ e => {
              e.preventDefault();
              onAddMoreOption();
            } } />
          </div>
        </fieldset>
      </div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <PbButton classes={ '__small' } text={ 'Delete Item' } onClick={ onDelete } />
      </div>
    </fieldset>
  </div>
}