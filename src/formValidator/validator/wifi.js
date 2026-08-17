import i18n from "../../i18n/index"
export const WIFIPassworkRule = (rule, value, callback) => {
  // rule规则对象
  var re = /^[\x00-\x7F]*$/
  if (value.length < 8) {
    callback(new Error(i18n.t('ruleTip.WIFIPassworkRule')))
  } else if (!re.test(value)) {
    callback(new Error(i18n.t('other.wifiPwdRuleNew')))
  } else {
    callback()
  }
}
export const wifiSSIDRule = (rule, value, callback) => {
  // rule规则对象
  var re = /^[A-Za-z0-9_. -]+$/
  if (value.length < 1) {
    callback(new Error(i18n.t('ruleTip.wifiSSIDLenRule')))
  } else if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.wifiSSIDRule')))
  } else {
    callback()
  }
}

// DNS校验
export const baseAddrRule = (rule, value, callback) => {
  var DNSreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (!DNSreg.test(value)) {
    callback(new Error(i18n.t('ruleTip.DMZIPAddrRule')))
  } else {
    callback()
  }
}

// MAC fillter 名称校验
export const macFilterNameRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9_.\s-]+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.macFilterNameRule')))
  } else {
    callback()
  }
}

// MAC fillter 地址校验
export const macFilterAddrRule = (rule, value, callback) => {
  var macReg = /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/;
  if (!macReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.macFilterAddrRule')))
  } else {
    callback()
  }
}

// 设备名称校验
export const deviceNameRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9_.\s-]+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.deviceNameRule')))
  } else {
    callback()
  }
}

// URL校验
export const urlRule = (rule, value, callback) => {
  let tempValue = value
  if (tempValue.indexOf("http://") == 0 || tempValue.indexOf("https://") == 0) {
    let index = 0
    if (tempValue.indexOf("http://") == 0) {
      tempValue = tempValue.substring(7);
    } else {
      tempValue = tempValue.substring(8);
    }
  }
  var re = /^[A-Za-z0-9_.\s-]+$/
  if (!re.test(tempValue)) {
    callback(new Error(i18n.t('ruleTip.urlRule')))
  } else {
    callback()
  }
}

// day校验
export const dayRule = (rule, value, callback) => {
  if (value.length == 0) {
    callback(new Error(i18n.t('ruleTip.dayRule')))
  } else {
    callback()
  }
}

function ipToInt (ipAddress) {
  const parts = ipAddress.split('.');
  let result = 0;

  for (let i = 0; i < parts.length; i++) {
    result = (result << 8) + parseInt(parts[i], 10);
  }
  return result;
}


export default {
  WIFIPassworkRule,
  baseAddrRule,
  wifiSSIDRule,
  macFilterNameRule,
  macFilterAddrRule,
  deviceNameRule,
  urlRule,
  dayRule
}
