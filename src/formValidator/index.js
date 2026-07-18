// import i18n from "../i18n/index"
import network5G from './validator/5G'
import wifi from './validator/wifi'
import wan from './validator/wan'
console.log('network5G:', network5G)
const formRule = { ...network5G, ...wifi, ...wan }
// console.log('formRule', formRule)
export default formRule

