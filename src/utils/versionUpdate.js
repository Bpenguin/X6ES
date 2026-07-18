import axios from 'axios'

const isNewVersion = () => {
  let url = `//${window.location.host}/version.json?t=${new Date().getTime()}`
  axios.get(url).then(res => {
    if (res.status === 200) {
      let vueVersion = res.data.version || '1.00.000000'
      let localVueVersion = localStorage.getItem('vueVersion')
      localStorage.setItem('vueVersion', vueVersion)
      if (localVueVersion && localVueVersion != vueVersion) {
        window.location.reload(true)
        return
      }
    }
  })
}

export default {
  isNewVersion
}