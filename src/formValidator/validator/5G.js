import i18n from "../../i18n/index"
export const SIMPinRule = (rule, value, callback) => {
  var re = /^\d+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.SIMPinRule')))
  } else if (value.length < 4) {
    callback(new Error(i18n.t('ruleTip.SIMPinRule')))
  } else {
    callback()
  }
}

export const PUKPinRule = (rule, value, callback) => {
  // var re = /^[0-9]+.?[0-9]*/
  var re = /^\d+$/
  console.log(value, 'value')
  console.log(re.test(value), 'value')
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.PUKPinRule')))
  } else if (value.length < 4) {
    callback(new Error(i18n.t('ruleTip.PUKPinRule')))
  } else {
    callback()
  }
}


export const oldPinRule = (rule, value, callback) => {
  var re = /^\d+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.oldPinRule')))
  } else if (value.length < 4) {
    callback(new Error(i18n.t('ruleTip.oldPinRule')))
  } else {
    callback()
  }
}

export const newPinRule = (rule, value, callback) => {
  var re = /^\d+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.newPinRule')))
  } else if (value.length < 4) {
    callback(new Error(i18n.t('ruleTip.newPinRule')))
  } else {
    callback()
  }
}

export const confirmPinRule = (rule, value, callback) => {
  var re = /^\d+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.confirmPinRule')))
  } else if (value.length < 4) {
    callback(new Error(i18n.t('ruleTip.confirmPinRule')))
  } else {
    callback()
  }
}

// APN 配置名称校验
export const APNNameRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9_.\s-]+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.APNNameRule')))
  } else {
    callback()
  }
}

// APN 校验
export const APNRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.APNRule')))
  } else {
    callback()
  }
}

// IPV6  DNS校验
export const ipv6PriDNSRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.ipv6PriDNSRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.ipv6PriDNSRule')))
  // } else {
  callback()
  // }
}

// IPV6 IP校验
export const ipv6IPRule = (rule, value, callback) => {
  var re = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/
  if (value == '') callback(new Error(i18n.t('ruleTip.ipv6IPRule')))
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.ipv6IPRule')))
  } else {
    callback()
  }
}

// IPV6 Gateway校验
export const ipv6GatewayRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.ipv6GatewayRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.ipv6GatewayRule')))
  // } else {
  callback()
  // }
}

// IPV6 Prefix校验
export const IPv6PrefixRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.IPv6PrefixRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.IPv6PrefixRule')))
  // } else {
  callback()
  // }
}

// IPV6 username校验
export const ipv6UsernameRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.pppoeUserNameRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.ipv6UsernameRule')))
  // } else {
  callback()
  // }
}

// IPV6 密码校验
export const ipv6PwdRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.pppoePasswordRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.ipv6UsernameRule')))
  // } else {
  callback()
  // }
}

// IPV6 PrefixLength校验
export const IPv6PrefixLengthRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.IPv6PrefixLengthRqRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.IPv6PrefixLengthRule')))
  // } else {
  callback()
  // }
}

// IPV6 PrefixLength校验
export const IPv4PeerAddrRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.IPv4PeerAddrRqRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.fillWallIPRule')))
  // } else {
  callback()
  // }
}
// IPV6 PrefixLength校验
export const IPv4MaskLengthRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.IPv4MaskLengthRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.IPv4MaskLengthRule')))
  // } else {
  callback()
  // }
}
// IPV6 PrefixLength校验
export const IPv6AFTRAddrRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9.-]+$/
  if (value == '') callback(new Error(i18n.t('ruleTip.IPv6AFTRAddrRule')))
  // if (!re.test(value)) {
  //   callback(new Error(i18n.t('ruleTip.IPv6AFTRAddrRule')))
  // } else {
  callback()
  // }
}

export default {
  SIMPinRule,
  PUKPinRule,
  oldPinRule,
  confirmPinRule,
  newPinRule,
  APNNameRule, // APN 名称校验
  APNRule,
  ipv6PriDNSRule,
  ipv6IPRule,
  ipv6GatewayRule,
  IPv6PrefixRule,
  ipv6UsernameRule,
  ipv6PwdRule,
  IPv6PrefixLengthRule,
  IPv4PeerAddrRule,
  IPv4MaskLengthRule,
  IPv6AFTRAddrRule
}
