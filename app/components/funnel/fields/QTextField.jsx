export default function QTextField(config) {
  const { __key, help_text, type, placeholder, value, required } = config;

  return <div className="q-text-field">
    <p>key: { __key }</p>
    
  </div>
}