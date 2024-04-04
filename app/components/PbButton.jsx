export default function PbButton({ text, onClick, classes, before, after, title }) {
  return <button 
    type="button" 
    title={ title }
    className={ ['pb-button', classes].join(' ') } 
    onClick={ onClick }>
    { before }{ text }{ after }
  </button>
}