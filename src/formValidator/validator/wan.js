import i18n from "../../i18n/index"

// DNS校验
export const DMZIPAddrRule = (rule, value, callback) => {
  var DNSreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (!DNSreg.test(value)) {
    callback(new Error(i18n.t('ruleTip.DMZIPAddrRule')))
  } else {
    callback()
  }
}

// MAC地址校验
export const macAddressRule = (rule, value, callback) => {
  var macReg = /^[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}:[A-Fa-f\d]{2}$/;
  if (!macReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.macAddressRule')))
  } else {
    callback()
  }
}

// DNS校验
export const primaryDNSRule = (rule, value, callback) => {
  var DNSreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (value == '') callback()
  if (!DNSreg.test(value)) {
    callback(new Error(i18n.t('ruleTip.primaryDNSRule')))
  } else {
    callback()
  }
}

export const secondaryDNSRule = (rule, value, callback) => {
  var DNSreg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (value == '') callback()
  if (!DNSreg.test(value)) {
    callback(new Error(i18n.t('ruleTip.secondaryDNSRule')))
  } else {
    callback()
  }
}

// IP地址校验
export const WanIPRule = (rule, value, callback) => {
  var ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
  if (!ipReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.WanIPRule')))
    // callback(new Error('The WAN IP address is invalid, please enter a valid address.'))
  } else {
    callback()
  }
}

export const SubnetmaskRule = (rule, value, callback) => {
  var subnetMaskReg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/
  if (!subnetMaskReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.SubnetmaskRule')))
  } else {
    callback()
  }
}

export const defaultGatewayRule = (rule, value, callback) => {
  var ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
  // const gatewayReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

  // var gatewayReg = /^192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2}$/
  if (!ipReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.defaultGatewayRule')))
  } else {
    callback()
  }
}

export const MtuRule = (rule, value, callback) => {
  var MTUReg = /^[0-9]*$/
  console.log('value', value)
  if (!MTUReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.MTUValidRule')))
  } else if (value < 576 || value > 1500) {
    callback(new Error(i18n.t('ruleTip.MTUAreaRule')))
  } else {
    callback()
  }
}

export const MtuPpoeRule = (rule, value, callback) => {
  var MTUReg = /^[0-9]*$/
  if (!MTUReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.defaultGatewayRule')))
  } else if (value < 576 || value > 1492) {
    callback(new Error(i18n.t('ruleTip.defaultGatewayRule')))
  } else {
    callback()
  }
}

export const intervalRule = (rule, value, callback) => {
  var MTUReg = /^[0-9]*$/
  console.log('value', value)
  if (!MTUReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.intervalRule')))
  } else if (value <= 0 || value > 60) {
    callback(new Error(i18n.t('ruleTip.intervalRule')))
  } else {
    callback()
  }
}

export const failuresFailoverRule = (rule, value, callback) => {
  var MTUReg = /^[0-9]*$/
  if (!MTUReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.failuresFailoverRule')))
  } else if (value < 0 || value > 10) {
    callback(new Error(i18n.t('ruleTip.failuresFailoverRule')))
  } else {
    callback()
  }
}

export const successfulBackRule = (rule, value, callback) => {
  var MTUReg = /^[0-9]*$/
  if (!MTUReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.successfulBackRule')))
  } else if (value < 0 || value > 10) {
    callback(new Error(i18n.t('ruleTip.successfulBackRule')))
  } else {
    callback()
  }
}

// fillWall 名称校验
export const fillWallNameRule = (rule, value, callback) => {
  var re = /^[A-Za-z0-9_.\s-]+$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.fillWallNameRule')))
  } else {
    console.log('fillWallNameRule')
    callback()
  }
}
// fillWall port校验
export const fillWallPortRule = (rule, value, callback) => {
  const numCheck = (item) => {
    if (/^[0-9]*$/.test(item)) {
      if (item > 65535 || item < 1) {
        callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
      } else {
        callback()
      }
    } else {
      callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
    }
  }
  if (value == '') callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
  var re = /^[0-9,-]*$/
  if (!re.test(value)) {
    callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
  } else if (value.indexOf(',') > -1) {
    let tempArray = value.split(',')
    let arr = tempArray.filter((item) => {
      return item != '' && /^[0-9]*$/.test(item) && item > 0 && item < 65536
    })
    if (arr.length == tempArray.length) {
      callback()
    } else {
      callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
    }
  } else if (value.indexOf('-') > -1) {
    let tempArray = value.split('-')
    if (tempArray.length > 2) {
      callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
    } else {
      let arr = tempArray.filter((item) => {
        return item != '' && /^[0-9]*$/.test(item) && item > 0 && item < 65536
      })
      if (arr.length == 2) {
        callback()
      } else {
        callback(new Error(i18n.t('ruleTip.fillWallPortRule')))
      }
    }
  } else {
    numCheck(value)
  }
}

let portforwardIPRule = (rule, value, callback) => {
  var ipReg = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/
  if (!ipReg.test(value)) {
    callback(new Error(i18n.t('ruleTip.fillWallIPRule')))
  } else {
    callback()
  }
}
// port forwaring 名称校验
export const portforwardPortRule = (rule, value, callback) => {
  if (value == '') callback(new Error(i18n.t('ruleTip.protForwardPortRqRule')))
  let re2 = /^[0-9-]*$/
  if (/^[0-9]*$/.test(value)) {
    if (value > 65535 || value < 1) {
      callback(new Error(i18n.t('ruleTip.protForwardPortRqRule')))
    } else {
      callback()
    }
  } else if (!re2.test(value)) {
    callback(new Error(i18n.t('ruleTip.protForwardPortFirRule')))
  } else {
    console.log('value:', value)
    let tempArray = value.split('-')
    if (tempArray.length != 2) {
      callback(new Error(i18n.t('ruleTip.protForwardPortFirRule')))
    } else {
      let arr = tempArray.filter((item) => {
        return item != ''
      })
      if (arr.length != tempArray.length) {
        callback(new Error(i18n.t('ruleTip.protForwardPortFirRule')))
      }

      let arr2 = tempArray.filter((item) => {
        return item > 0 && item < 65536
      })
      if (arr2.length != tempArray.length) {
        callback(new Error(i18n.t('ruleTip.protForwardPortRqRule')))
      }
      if ((tempArray[0] - 0) >= (tempArray[1] - 0)) {
        callback(new Error(i18n.t('ruleTip.protForwardPortSecRule')))
      } else {
        callback()
      }
    }
  }
}

export default {
  DMZIPAddrRule,
  macAddressRule,
  primaryDNSRule, // 主DNS配置
  secondaryDNSRule, // 第二DNS配置
  WanIPRule,
  SubnetmaskRule,
  defaultGatewayRule,
  MtuRule,
  MtuPpoeRule,
  intervalRule,
  failuresFailoverRule,
  successfulBackRule,
  fillWallNameRule,
  fillWallPortRule,
  portforwardIPRule,
  portforwardPortRule,
}
