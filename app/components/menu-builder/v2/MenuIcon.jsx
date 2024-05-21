const __ICONS = {
  'HB': `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11.88 0H0.12C0.054 0 0 0.0613636 0 0.136364V1.22727C0 1.30227 0.054 1.36364 0.12 1.36364H11.88C11.946 1.36364 12 1.30227 12 1.22727V0.136364C12 0.0613636 11.946 0 11.88 0ZM11.88 10.6364H0.12C0.054 10.6364 0 10.6977 0 10.7727V11.8636C0 11.9386 0.054 12 0.12 12H11.88C11.946 12 12 11.9386 12 11.8636V10.7727C12 10.6977 11.946 10.6364 11.88 10.6364ZM11.88 5.31818H0.12C0.054 5.31818 0 5.37955 0 5.45455V6.54545C0 6.62045 0.054 6.68182 0.12 6.68182H11.88C11.946 6.68182 12 6.62045 12 6.54545V5.45455C12 5.37955 11.946 5.31818 11.88 5.31818Z"/> </svg>`,
  'arrow_down': `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M759.2 419.8L697.4 358 512 543.4 326.6 358l-61.8 61.8L512 667z"/></svg>`,
  'arrow_next': `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M419.3 264.8l-61.8 61.8L542.9 512 357.5 697.4l61.8 61.8L666.5 512z"/></svg>`,
}

export default function MenuIcon ({ source, className }) {
  return <span className={ ['__menu-icon', className].join(' ') } dangerouslySetInnerHTML={{__html: __ICONS[source]}}></span>
}