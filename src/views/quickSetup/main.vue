<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <div class="container-main-content-body"> -->
  <div>
    <div>
      <div class="block-body">
        <div class="page-description">{{ $t('other.quickSetupDesc') }}</div>
      </div>
      <div class="block-body">
        <div class="pri-mode-selector">
          <div class="pri-mode-selector">
            <div class="pri-mode-col" @click="clickMode(0)">
              <button class="pri-mode-option">
                <div class="pri-mode-title">{{$t('other.RouterMode')}}</div>
                <div class="pri-mode-note">
                  {{$t('other.RouterModeDes')}}
                </div>
              </button>
            </div>
            <div class="pri-mode-col" @click="clickMode(1)">
              <button class="pri-mode-option">
                <div class="pri-mode-title">{{$t('other.MeshController')}}</div>
                <div class="pri-mode-note">{{$t('other.MeshControllerDes')}}</div>
              </button>
            </div>
            <div class="pri-mode-col" @click="clickMode(2)">
              <button class="pri-mode-option">
                <div class="pri-mode-title">{{$t('other.MeshAgent')}}</div>
                <div class="pri-mode-note">{{$t('other.MeshAgentDes')}}</div>
              </button>
            </div>
            <div class="pri-mode-col" @click="clickMode(3)">
              <button class="pri-mode-option">
                <div class="pri-mode-title">{{$t('other.AgentMode')}}</div>
                <div class="pri-mode-note">{{$t('other.AgentModeDes')}}</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pri-setup-padding">
      <div class="block-header mb-4">
        {{$t('other.title1')}}
      </div>
      <div class="block-body">
        <div class="pri-setup-row">
          <div class="pri-setup-row-num">1</div>
          <div class="pri-setup-row-text">
            {{$t('other.title2')}}
            <i class="pri-inline-number">
              <svg-icon class-name="green-fill" :icon-class="'A'"></svg-icon>
            </i>
          </div>
        </div>
        <div class="pri-setup-row">
          <div class="pri-setup-row-num">2</div>
          <div class="pri-setup-row-text">{{$t('other.title3')}}
            <i class="pri-inline-number">
              <svg-icon class-name="green-fill" :icon-class="'B'"></svg-icon>
            </i>
          </div>
        </div>
        <div class="pri-setup-row">
          <img src="../../assets/img/img_setup_topology.png" alt="" class="pri-onboard-img">
          <img src="../../assets/img/img_setup_topology_m.png" alt="" class="pri-onboard-img-mobile">
        </div>
        <div class="pri-setup-row">
          <div class="pri-setup-row-text" style="padding-inline-start: 40px;">
            {{$t('common.note')+':'+$t('other.title4')}}
          </div>
        </div>
        <div class="pri-setup-row mt-5">
          <div class="pri-setup-row-num">3</div>
          <div class="pri-step-row-text-column pri-setup-row-text">
            <div>{{$t('other.title5')}}</div>
            <div class="mt-3">
              <i class="pri-inline-number">
                <svg-icon class-name="green-fill" :icon-class="'C'"></svg-icon>
              </i>
              {{$t('other.title6')}}
            </div>
            <div class="my-3">
              <i class="pri-inline-number">
                <svg-icon class-name="green-fill" :icon-class="'D'"></svg-icon>
              </i>
              {{$t('other.title7')}}
            </div>
          </div>
        </div>
        <div class="pri-setup-row">
          <img src="../../assets/img/img_w6m_setup_onboarding.png" class="pri-onboard-img">
          <img src="../../assets/img/img_w6m_setup_onboarding_m.png" class="pri-onboard-img-mobile">
        </div>
        <div class="pri-setup-row">
          <div class="pri-setup-row-num">4</div>
          <div class="pri-setup-row-text">
            {{$t('other.title8')}} </div>
        </div>
        <div class="pri-lighting-row">
          <div class="pri-lighting">
            <i class="pri-inline-number">
              <img src="../../assets/img/Flashing.png" alt="">
            </i>
            <div class="pri-setup-row-text">{{$t('other.title9')}}</div>
          </div>
          <div class="pri-arrow">
            <svg-icon class-name="though-svg green-fill" :icon-class="'though'"></svg-icon>
            <!-- <svg width="116" height="12" viewBox="0 0 116 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M116 6.00001L106 0.226506L106 11.7735L116 6.00001ZM-8.74228e-08 7L107 7.00001L107 5.00001L8.74228e-08 5L-8.74228e-08 7Z" fill="#00DC50"></path>
            </svg> -->
          </div>
          <div class="pri-lighting">
            <i class="pri-inline-number">
              <img src="../../assets/img/Solid.png" alt="">
            </i>
            <div class="pri-setup-row-text">{{$t('other.title10')}}</div>
          </div>
        </div>
        <div class="pri-setup-row">
          <div class="pri-setup-row-num">5</div>
          <div class="pri-setup-row-text">{{$t('other.title11')}}</div>
        </div>
        <div class="pri-setup-row">
          <img src="../../assets/img/img_setup_placement.png" class="pri-onboard-img">
          <img src="../../assets/img/img_setup_placement.png" class="pri-onboard-img-mobile">
        </div> <!---->
      </div>
    </div>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" @leftBtnClick="goToDashboard"></mine-dialog>
  </div>
</template>

<script>
import MineDialog from '@/components/MineDialog'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  components: { MineDialog },
  computed: {},
  data() {
    return {
      showDialogInfo: {
        showDialog: false,
        showCloseBtn: true,
        title: 'nav.quickSetup', // 标题
        msgTitle: 'quickSetup.setSuccessTip',
        leftBtnText: 'common.ok' //右侧按钮的描述
      }
    }
  },
  created() {},
  mounted() {
    this.initData()
  },
  methods: {
    clickMode(modeType) {
      this.$emit('startSetting', { modeType: modeType })
    }
  },
  destroyed() {}
}
</script>

<style lang="scss">
.pri-mode-selector {
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin-top: 30px;
}
.pri-mode-col {
  --width: 50%;
  flex: 0 0 auto;
  width: var(--width);
  padding-inline: 15px;
  padding-block-end: 30px;
}
.pri-mode-option {
  text-align: start;
  background: linear-gradient(180deg, #003a27, #001f15);
  border-radius: 10px;
  border: 1px solid #045037;
  width: 100%;
  height: 100%;
  padding: 20px;
  padding-block-end: 40px;
  cursor: pointer;
}
.pri-mode-title {
  font-size: 20px;
  color: #fff;
  padding-bottom: 15px;
}
.pri-mode-note {
  font-size: 18px;
  line-height: 1.2;
  color: #8d9092;
}
.pri-setup-padding {
  width: 90%;
  margin: auto;
  padding-inline: 15px;
  padding-top: 30px;
  border-top: 2px solid #00dc50;
}
.block-header {
  font-size: 22px;
  color: #00dc50;
}
.mb-4,
.my-4 {
  margin-bottom: 30px !important;
}
.mt-3,
.my-3 {
  margin-top: 30px !important;
}
.pri-setup-row {
  display: flex;
  flex-flow: row wrap;
  margin-bottom: 30px;
}
.pri-setup-row-num {
  font-size: 24px;
  width: 40px;
  color: #00dc50;
}
.pri-setup-row-text {
  flex: 1 1 0;
  color: #8d9092;
  padding-top: 5px;
}
.pri-onboard-img {
  -webkit-user-drag: none;
  display: flex;
  width: 640px;
  margin-inline: auto;
}
.pri-onboard-img-mobile {
  -webkit-user-drag: none;
  display: flex;
  width: 100%;
  margin-inline: auto;
}
.pri-lighting-row {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-block: 30px;
}
.pri-lighting {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.though-svg {
  width: 116px !important;
  height: 12px !important;
}
.green-fill {
  fill: #00dc50;
}
@media screen and (max-width: 1599px) {
  .pri-mode-col {
    --width: 50%;
  }
}
@media screen and (max-width: 1251px) {
  .pri-mode-col {
    --width: 100%;
  }
}
@media screen and (max-width: 99px) {
  .pri-mode-col {
    --width: 50%;
  }
}
@media screen and (min-width: 640px) {
  .pri-onboard-img-mobile {
    display: none;
  }
}
</style>
