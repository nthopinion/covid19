import base from './base.json'
import prod from './prod.json'
const basedConfig = window.location.hostname === 'localhost'? base: prod
export default base
