<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-main-content-body">
    <div class="block-body">
      <div class="page-description">
        {{ $t('system.timeScr') }}
      </div>
    </div>

    <div class="block-body">

      <!-- 自动设置时间 -->
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>
            {{ $t('system.automaticallySetTime') + ': ' }}
          </div>
        </el-col>

        <el-col :span="12" :xs="10">
          <el-switch v-model="setTimeSwitch" @change="changeTimeSwitch" active-color="#00dc50" inactive-color="#8d9092">
          </el-switch>
        </el-col>
      </el-row>

      <!-- 自动保存时间 -->
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>
            {{ $t('system.automaticallySaveTime') + ': ' }}
          </div>
        </el-col>

        <el-col :span="12" :xs="10">
          <el-switch v-model="saveTimeSwitch" :disabled="setTimeSwitch" active-color="#00dc50" inactive-color="#8d9092">
          </el-switch>
        </el-col>
      </el-row>

      <!-- 时区 -->
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>
            {{ $t('system.tmieZone') + ': ' }}
          </div>
        </el-col>

        <el-col :span="12" :xs="18">

          <!--
            外层容器
            el-select 负责正常的下拉选择
            timezone-marquee 负责选中后的文字显示
          -->
          <div class="timezone-select-wrapper" :class="{ 'is-disabled': setTimeSwitch }">

            <!-- Element UI 原始下拉框 -->
            <el-select v-model="zoneIndex" :disabled="setTimeSwitch" popper-class="x6-select" :placeholder="''" @change="handleTimezoneChange">

              <el-option v-for="item in timeZoneModels" :key="item.value" :label="item.label" :value="item.value">
              </el-option>

            </el-select>

            <!--
              选中的时区名称

              注意：
              pointer-events: none
              保证点击文字时仍然可以正常打开 el-select
            -->
            <div v-if="selectedTimezone" ref="timezoneMarquee" class="timezone-marquee">

              <div ref="timezoneMarqueeText" class="timezone-marquee-text" :class="{
                  scrolling: needTimezoneScroll
                }" :style="timezoneAnimationStyle">
                {{ selectedTimezone.label }}
              </div>

            </div>

          </div>

        </el-col>
      </el-row>

      <!-- 当前时间 -->
      <el-row class="c-row">
        <el-col :span="12" :xs="24">
          <div>
            {{ $t('system.currentDateTime') + ': ' }}
          </div>
        </el-col>

        <el-col :span="12" :xs="24">
          <div>
            {{ time }}
          </div>
        </el-col>
      </el-row>

    </div>

    <!-- 按钮 -->
    <div class="block-body">
      <div class="c-row btn-row">

        <mine-button :btn-title="$t('common.cancel')" @clickBtn="cancelForm">
        </mine-button>

        <mine-button :btn-title="$t('common.apply')" @clickBtn="applyForm">
        </mine-button>

      </div>
    </div>

  </div>
</template>

<script>
import Moment from 'moment'
import { setSysNtpTime, getSysNtpTime } from '@/api/system'
import { timeZoneList } from '@/utils/selectsList'

export default {
  name: 'Time',

  data() {
    return {
      ntpData: {},

      setTimeSwitch: true,

      saveTimeSwitch: true,

      zoneIndex: 0,

      timeZoneModels: [],

      time: '',

      timer: '',

      NTPServer1: '',

      NTPServer2: '',

      NTPServer3: '',

      /*
       * 当前时区名称是否需要滚动
       */
      needTimezoneScroll: false,

      /*
       * CSS 动画参数
       */
      timezoneAnimationStyle: {}
    }
  },

  computed: {
    /**
     * 获取当前选中的时区对象
     */
    selectedTimezone() {
      return (
        this.timeZoneModels.find((item) => item.value === this.zoneIndex) ||
        null
      )
    }
  },

  created() {
    this.timeZoneModels = timeZoneList
  },

  mounted() {
    this.initData()

    /*
     * DOM 渲染完成以后检查一次
     */
    this.$nextTick(() => {
      this.checkTimezoneScroll()
    })

    /*
     * 浏览器窗口大小发生变化时重新计算
     *
     * 例如：
     * PC窗口缩小
     * 浏览器全屏
     * 页面响应式布局变化
     */
    window.addEventListener('resize', this.checkTimezoneScroll)
  },

  methods: {
    /**
     * 初始化数据
     */
    initData() {
      getSysNtpTime().then((data) => {
        if (data.retcode == 0) {
          this.zoneIndex = data.zoneIndex

          this.setTimeSwitch = data.timezoneSyncSwitch == 1

          this.saveTimeSwitch = data.dstSyncSwitch == 1

          this.time = data.currentLocalTime

          /*
           * 格式化当前时间
           */
          this.time = Moment(
            data.currentLocalTime,
            'YYYY-MM-DD HH:mm:ss'
          ).format('MM-DD-YYYY HH:mm:ss')

          /*
           * 清除之前的定时器
           */
          clearInterval(this.timer)

          this.timer = null

          /*
           * 每秒更新一次时间
           */
          this.timer = setInterval(() => {
            this.time = Moment(this.time, 'MM-DD-YYYY HH:mm:ss')
              .add(1, 's')
              .format('MM-DD-YYYY HH:mm:ss')
          }, 1000)

          /*
           * 等待 Vue 更新 zoneIndex 后，
           * 再检查时区文字是否超长
           */
          this.$nextTick(() => {
            this.checkTimezoneScroll()
          })
        }
      })
    },

    /**
     * 检查时区名称是否超出显示区域
     *
     * 如果：
     *
     * 文字宽度 <= 输入框宽度
     *
     * 则不滚动。
     *
     * 如果：
     *
     * 文字宽度 > 输入框宽度
     *
     * 则开启轮播。
     */
    checkTimezoneScroll() {
      this.$nextTick(() => {
        const container = this.$refs.timezoneMarquee

        const text = this.$refs.timezoneMarqueeText

        /*
         * DOM 尚未生成
         */
        if (!container || !text) {
          this.needTimezoneScroll = false

          this.timezoneAnimationStyle = {}

          return
        }

        /*
         * 获取文字实际宽度
         */
        const textWidth = text.scrollWidth

        /*
         * 获取显示区域宽度
         */
        const containerWidth = container.clientWidth

        /*
         * 多留2px，避免边界情况下不断切换
         */
        this.needTimezoneScroll = textWidth > containerWidth + 2

        /*
         * 不需要滚动
         */
        if (!this.needTimezoneScroll) {
          this.timezoneAnimationStyle = {}

          return
        }

        /*
         * 需要滚动的距离
         *
         * 例如：
         *
         * 文字宽度 500px
         * 显示区域 200px
         *
         * 滚动距离 = 300px
         */
        const distance = textWidth - containerWidth

        /*
         * 根据文字长度动态计算动画时间
         *
         * 速度约 35px/s
         *
         * 最少4秒
         */
        const duration = Math.max(4, distance / 35 + 2)

        this.timezoneAnimationStyle = {
          '--timezone-distance': `${distance}px`,

          '--timezone-duration': `${duration}s`
        }
      })
    },

    /**
     * 用户手动选择时区
     */
    handleTimezoneChange() {
      this.$nextTick(() => {
        /*
         * 重新检测文字长度
         */
        this.checkTimezoneScroll()
      })
    },

    /**
     * 恢复修改
     */
    cancelForm() {
      this.initData()
    },

    /**
     * 自动设置时间开关
     */
    changeTimeSwitch(val) {
      if (val) {
        this.applyForm()
      }
    },

    /**
     * 修改时间
     */
    applyForm() {
      let params = {}

      params.timezoneSyncSwitch = this.setTimeSwitch ? 1 : 0

      params.dstSyncSwitch = this.saveTimeSwitch ? 1 : 0

      /*
       * 手动设置时间时才提交时区
       */
      if (!this.setTimeSwitch) {
        params.zoneIndex = this.zoneIndex
      }

      setSysNtpTime(params).then((data) => {
        if (data.retcode == 0) {
          this.initData()

          this.$publicFun.showSucMessage(this)
        } else {
          this.$publicFun.showErrMessage(this)
        }
      })
    },

    /**
     * 手动设置时间时，计算时间
     */
    formatDate() {
      return ''
    }
  },

  beforeDestroy() {
    /*
     * 清除时间定时器
     */
    clearInterval(this.timer)

    this.timer = null

    /*
     * 清除 resize 监听
     */
    window.removeEventListener('resize', this.checkTimezoneScroll)
  },

  destroyed() {}
}
</script>

<style lang="scss" scoped>
/*
 * ============================================================
 * 时区选择框
 * ============================================================
 */

.timezone-select-wrapper {
  position: relative;

  width: 100%;

  min-width: 0;

  /*
   * Element UI el-select
   */
  .el-select {
    width: 100%;
  }
}

/*
 * ============================================================
 * 时区滚动文字容器
 * ============================================================
 *
 * 这个 div 覆盖在 el-select 的输入框上面。
 *
 * 但 pointer-events 设置为 none，
 * 所以鼠标点击仍然会穿透到 el-select。
 */

.timezone-marquee {
  position: absolute;

  top: 1px;

  left: 5px;

  /*
   * 给右侧下拉箭头留空间
   */
  right: 30px;

  height: 38px;

  /*
   * 超出的文字隐藏
   */
  overflow: hidden;

  /*
   * 不允许换行
   */
  white-space: nowrap;

  /*
   * Element UI 默认输入框高度约34px
   */
  line-height: 38px;

  /*
   * 非常重要：
   * 不阻挡 el-select 鼠标事件
   */
  pointer-events: none;

  background-color: #001e14;
  font-weight: 500;
  font-family: acer-regular;
  /*
   * 覆盖在 select 上面
   */
  z-index: 2;
}

/*
 * ============================================================
 * 时区文字
 * ============================================================
 */

.timezone-marquee-text {
  /*
   * inline-block 才能正确获取文字实际宽度
   */
  display: inline-block;

  /*
   * 禁止换行
   */
  white-space: nowrap;

  /*
   * 初始位置
   */
  transform: translateX(0);

  /*
   * 浏览器优化动画性能
   */
  will-change: transform;
}

/*
 * ============================================================
 * 超长文字滚动动画
 * ============================================================
 *
 * 只有 needTimezoneScroll=true 时才添加 animation。
 */

.timezone-marquee-text.scrolling {
  animation: timezone-marquee-animation var(--timezone-duration) linear infinite
    alternate;
}

/*
 * ============================================================
 * 核心滚动动画
 * ============================================================
 *
 * 0%：
 *
 * |Beijing, Chongqing, Hong...|
 *
 * 100%：
 *
 * |...Chongqing, Hong Kong...|
 *
 * 最终：
 *
 * |...Hong Kong, Urumqi      |
 *
 * 通过计算：
 *
 * textWidth - containerWidth
 *
 * 确保文字能够完整滚动到尾部。
 */

@keyframes timezone-marquee-animation {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-1 * var(--timezone-distance)));
  }
}

/*
 * ============================================================
 * disabled 状态
 * ============================================================
 */

.timezone-select-wrapper.is-disabled {
  .timezone-marquee {
    cursor: not-allowed;
  }
}
</style>