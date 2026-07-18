<template>
  <div class="pri-main-page-container">
    <!-- <h1>这是登录页面</h1> -->
    <header-view></header-view>
    <div class="pri-content-wrapper-home">
      <div class="language-view">
        <language-select class="select-lang"></language-select>
      </div>
      <span>
        <div class="pri-content-body">
          <div class="block-body">
            <div class="c-row">
              <label class="pri-admin-label">{{ $t('login.logintitle') }}</label>
            </div>
            <!-- <div>{{ $t('login.logintitle') }}</div> -->
            <div class="c-row">
              <div class="pass-word">
                <pwd-input v-model="currentPwd" :is-login-status="true" @enterComplete="handeLogin" :placeholder="'login.enterPassword'" :show-error-style="showErrorStyle" @input="showErrorStyle=false"></pwd-input>
              </div>
            </div>
            <div v-show="showErrorStyle" class="c-row">
              <label :class="showErrorStyle?'err-pwd-tip show-err-pwd':'err-pwd-tip' ">{{ $t(showErrorText) }}</label>
            </div>
            <div class="c-row">
              <div class="remmber-pwd">
                <el-checkbox class="check-box" v-model="checked"></el-checkbox>
                <label class="remmber-pwd-text">{{ $t('login.rememberpwd') }}</label>
              </div>
            </div>
            <!-- <div class="login-btn" @click="handeLogin">{{ $t('login.loginbtn') }}</div> -->
            <div class="c-row">
              <div class="bottom-btn">
                <mine-button :btn-title="$t('login.loginbtn')" @clickBtn="handeLogin"></mine-button>
              </div>
            </div>
            <!-- 下方二维码信息 -->
            <div class="scan-view">
              <div class="line-view"></div>
              <div>{{ $t('login.downloadapp') }}</div>
              <div class="link-app-view">
                <div class="link-view">
                  <div class="link-item ios-link">
                    <svg-icon :icon-class="'apple-store'" class-name="link-svg"></svg-icon>
                  </div>
                  <div class="link-item google-link">
                    <svg-icon :icon-class="'app-google'" class-name="link-svg"></svg-icon>
                  </div>
                </div>
                <div class="code-view">
                  <img src="../../assets/app-code.png" alt="">
                </div>
              </div>
              <div>{{ $t('login.videomsg') }}</div>
              <div class="code-view">
                <img src="../../assets/video-code.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
    <mine-dialog :show-dialog='dialogInfo.showDialog' :title="dialogInfo.title" :msg-title="dialogInfo.msgTitle" :show-close-btn="dialogInfo.showCloseBtn" :left-btn-text="dialogInfo.leftBtnText" @leftBtnClick="leftBtnClick" @closeDialog="dialogInfo.showDialog = false"></mine-dialog>
    <!-- <mine-dialog :show-dialog='dialogInfo.showDialog' :show-close-btn="dialogInfo.showCloseBtn" :left-btn-text="dialogInfo.leftBtnText" @leftBtnClick="leftBtnClick" :right-btn-text="dialogInfo.rightBtnText" @rightBtnClick="rightBtnClick"></mine-dialog> -->
  </div>
</template>

<script>
import LanguageSelect from '../../components/LanguageSelect'
import { login, getLoginInfo } from '@/api/user'
import { setToken } from '../../utils/auth'
import { montagepwd } from '@/utils/until'
import MineDialog from '@/components/MineDialog'
import PwdInput from '@/components/PwdInput'
import HeaderView from '../../components/HeaderLogo/index.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  components: { LanguageSelect, MineDialog, PwdInput, HeaderView },
  data() {
    return {
      showErrorStyle: false, // 密码输入错误标示
      currentPwd: '',
      checked: false,
      showErrorText: 'login.errPwd',
      dialogInfo: {
        showDialog: false, // 展示弹框按钮
        showCloseBtn: true, // 展示关闭按钮
        title: 'nav.systemPassword', // 标题
        msgTitle: 'login.changePwdMsg', // 主要内容
        leftBtnText: 'login.changePwdBtnTittle' //左侧按钮的描述
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    this.clearAllCookies()

    let rememberInfo = localStorage.getItem('remeberKey')
    if (rememberInfo) {
      rememberInfo = JSON.parse(rememberInfo)
      if (rememberInfo.checked) {
        this.checked = rememberInfo.checked
        this.currentPwd = rememberInfo.abcp
      }
    }
  },
  destroyed() {},
  methods: {
    clearAllCookies() {
      // 获取所有cookie键值
      const cookies = document.cookie.split('; ')

      // 遍历并清除
      for (const cookie of cookies) {
        const equalIndex = cookie.indexOf('=')
        // 设置cookie的过期时间为过去的时间，以便浏览器删除它
        const name = equalIndex > 0 ? cookie.substr(0, equalIndex) : cookie
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
      }
    },
    handeLogin: function () {
      let _this = this
      this.getLoginPrikey()
        .then(() => {
          let prikey = _this.$store.state.user.loginInfo.priKey
          console.log(
            'this is input prikey and password',
            prikey,
            _this.currentPwd
          )
          let pwdSec = montagepwd(prikey, _this.currentPwd)
          // return
          _this.loginX6(pwdSec)
        })
        .catch((error) => {
          console.log('error:', error)
        })
    },
    loginX6(pwdSec) {
      let params = {
        usrname: 'admin',
        password: pwdSec
      }
      login(params).then((data) => {
        if (data.retcode === 0) {
          sessionStorage.setItem('login-token', '1111')
          localStorage.setItem(
            'remeberKey',
            JSON.stringify({
              checked: this.checked,
              abcp: this.currentPwd
            })
          )
          if (sessionStorage.getItem('login_flag') == 0) {
            this.$router.replace({ path: '/' })
          } else {
            this.dialogInfo.showDialog = true
          }
        } else if (data.retcode === 203 && data.remainTimes === 0) {
          this.showErrorText = 'other.errPwdReset'
          this.showErrorStyle = true
        } else {
          this.showErrorText = 'login.errPwd'
          this.showErrorStyle = true
          console.log('login is error')
        }
      })
    },
    async getLoginPrikey() {
      await getLoginInfo().then((data) => {
        if (data.retcode === 0) {
          const { login_flag, priKey } = data
          sessionStorage.setItem('login_flag', login_flag)
          this.$store.dispatch('user/setLoginInfo', {
            login_flag,
            priKey
          })
          console.log(this.$store.state)
        }
      })
    },
    changePwdValue(val) {
      this.showErrorStyle = false
    },
    leftBtnClick() {
      this.dialogInfo.showDialog = false
      this.$router.push({
        path: '/system/password'
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.pri-main-page-container {
  margin: 0 auto;
  width: 100%;
  margin-bottom: unset;
}
.pri-content-wrapper-home {
  background: transparent;
  padding: 20px px 0 0 0;
  width: auto;
  overflow: hidden;
  position: static;
  background-color: $black-bg;
  .pri-content-body {
    padding: 20px 0;
    width: 40%;
    margin: 5% auto;
    background-color: $app-main-bg;
    border-radius: 20px;
    .block-body {
      font-size: 18px;
      width: 90%;
      margin: 15px auto;
      .c-row {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        line-height: 40px;
        align-items: center;
        margin: 40px 0;
        .pri-admin-label {
          color: #fff;
          text-align: center;
          font-weight: 500;
          width: 100%;
        }
      }
    }
  }
}
@media screen and (max-width: 1250px) {
  .pri-content-wrapper-home {
    width: 100%;
    margin: auto;
    overflow: visible;
    min-height: calc(100vh - 200px);
    .pri-content-body {
      width: 100%;
      .block-body {
        font-size: 16px;
        width: 95%;
        .c-row {
          margin: 10px 0;
        }
      }
    }
  }
}
.mainPageContainer {
  margin: 0 auto;
  width: 100%;
  margin-bottom: unset;
}

.language-view {
  width: 100%;
  height: 60px;
  text-align: right;
  .select-lang {
    width: 200px;
    margin-right: 60px;
    float: right;
  }
}

.scan-view {
  display: none;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.scan-view > div {
  margin-top: 40px;
}
.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
  width: 40%;
  margin: 5% auto;
  background-color: $app-main-bg;
}
.login-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin: auto;
  width: 100%;
  // min-width: 500px;
  height: auto;
  color: $login-font-color;
  font-size: 18px;
  margin-top: 20px;
  padding: 30px 20px;
  // background-color: $app-main-bg;
  background-image: url('../../assets/img/login-bg.png');
}
.pass-word {
  // position: relative;
  // display: flex;
  // flex-direction: row;
  width: 60%;
  margin: auto;
}
.remmber-pwd {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  margin: auto;
  .remmber-pwd-text {
    margin-left: -10px;
  }
}
.login-btn {
  height: 40px;
  line-height: 40px;
  width: auto;
  min-width: 105px;
  margin-top: 40px;
  border: 2px solid gray;
  border-radius: 5px;
  background-color: black;
}
.line-view {
  width: 90%;
  height: 1px;
  margin-top: 40px;
  background-color: #fff;
}
.link-app-view {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;
  justify-content: center;
  // margin-top: 30px;
  .link-view {
    display: flex;
    flex-direction: column;

    .link-item {
      width: 150px;
      // margin-top: 20px;
      // background-color: #fff;
    }
    .ios-link {
      margin-bottom: 5px;
      height: 50px;
    }
    .google-link {
      height: 44px;
    }
  }
}
.link-app-view > div {
  margin-top: 10px;
}
.code-view {
  width: 100px;
  height: 100px;
  margin-left: 40px;
  padding: 2px;
  background-color: #fff;
  img {
    height: 100%;
    width: 100%;
  }
}
.err-pwd-tip {
  margin-top: 10px !important;
  text-align: center;
  color: red;
  opacity: 0;
  margin: auto;
}
.show-err-pwd {
  opacity: 1;
}
.errPwdInput {
  border: 1px solid red;
}
.bottom-btn {
  margin: auto;
}
.guide-main > div {
  margin-top: 30px;
}
.eye-class {
  fill: $light-style-color !important;
}
.link-svg {
  width: 100% !important;
  height: 100% !important;
  color: black;
  // fill: black;
}
</style>
