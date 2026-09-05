<template>
  <div :id="id" :class="className" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;">
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import { getSysNtpTime } from '@/api/system'
export default {
  name: 'NetworkEchart',
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    rateNum: {
      type: Number,
      default: 0
    },
    ethRateNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      timer: null,
      options: {},
      currentRate: 0,
      // 保存基准时间戳，统一时间源，不再依赖数组字符串计算
      baseTimestamp: null
    }
  },
  mounted() {
    window.addEventListener('resize', this.reSizeChart)
    // 监听页面可见性切换
    document.addEventListener('visibilitychange', this.handleVisibilityChange)

    getSysNtpTime().then((data) => {
      if (data.retcode == 0) {
        let time = data.currentLocalTime
        this.initChart(time)
      } else {
        this.initChart()
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reSizeChart)
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    )
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    // 页面切回可见：重新对齐真实时间，修复后台漂移
    handleVisibilityChange() {
      if (!document.hidden && this.chart) {
        this.rebuildTimeAxis()
      }
    },
    // 根据基准时间重建完整61个时间刻度数组
    rebuildTimeAxis() {
      // 优先获取最新服务端时间；失败降级本地时间
      getSysNtpTime()
        .then((data) => {
          let nowMoment
          if (data.retcode === 0) {
            nowMoment = moment(data.currentLocalTime, 'YYYY-MM-DD HH:mm:ss')
          } else {
            nowMoment = moment(Date.now())
          }
          this.baseTimestamp = nowMoment.valueOf()
          // 往前推60秒生成完整x轴时间（共61个点）
          const xData = []
          for (let i = -60; i <= 0; i++) {
            xData.push(
              moment(this.baseTimestamp).add(i, 's').format('HH:mm:ss')
            )
          }
          this.options.xAxis[0].data = xData
          this.chart.setOption(this.options)
        })
        .catch(() => {
          // 接口异常降级本地时间
          const nowMoment = moment(Date.now())
          this.baseTimestamp = nowMoment.valueOf()
          const xData = []
          for (let i = -60; i <= 0; i++) {
            xData.push(
              moment(this.baseTimestamp).add(i, 's').format('HH:mm:ss')
            )
          }
          this.options.xAxis[0].data = xData
          this.chart.setOption(this.options)
        })
    },
    initChart(currentTime = '') {
      this.chart = echarts.init(document.getElementById(this.id))
      this.options = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          extraCssText: 'min-width:200px;',
          backgroundColor: '#ffffff',
          padding: 10,
          formatter: function (params) {
            let str = params[0].axisValueLabel + '<br />'
            str +=
              '<div style="display: flex;"><div style="padding-right: 5px; background-color: #00dc50; border-radius: 60%; width: 12px; height: 12px; margin: auto 10px auto auto;"></div><div style="width: 50px; text-align: left;">' +
              params[0].seriesName +
              '</div><div style="width: 70%; text-align: right; font-weight: bold;">' +
              params[0].data +
              ' Kbps</div></div>'
            str +=
              '<div style="display: flex;"><div style="padding-right: 5px; background-color: #4AB7BD; border-radius: 60%; width: 12px; height: 12px; margin: auto 10px auto auto;"></div><div style="width: 50px; text-align: left;">' +
              params[1].seriesName +
              '</div><div style="width: 70%; text-align: right; font-weight: bold;">' +
              params[1].data +
              ' Kbps</div></div>'
            return str
          },
          textStyle: {
            color: 'black'
          },
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          x: 'left',
          y: 'top',
          icon: 'rect',
          top: 20,
          left: 40,
          itemWidth: 30,
          itemHeight: 15,
          itemGap: 13,
          data: ['WAN', '5G'],
          selectedMode: false,
          textStyle: {
            fontSize: 16,
            color: '#00752b'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true,
          borderWidth: 1,
          borderColor: '#fff',
          show: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              interval: 'auto'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#57617B'
              }
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Kbps',
            minInterval: 10,
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#57617B'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: {
              lineStyle: {
                color: '#57617B'
              }
            }
          }
        ],
        series: [
          {
            name: 'WAN',
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#00dc50'
                    },
                    {
                      offset: 1,
                      color: '#00dc50'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#00dc50',
                borderColor: '#00dc50',
                borderWidth: 6
              }
            },
            data: []
          },
          {
            name: '5G',
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 2
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#4AB7BD'
                    },
                    {
                      offset: 1,
                      color: '#4AB7BD'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: {
              normal: {
                color: '#4AB7BD',
                borderColor: '#4AB7BD',
                borderWidth: 6
              }
            },
            data: []
          }
        ]
      }
      let initMoment
      if (currentTime === '') {
        initMoment = moment(Date.now())
      } else {
        initMoment = moment(currentTime, 'YYYY-MM-DD HH:mm:ss')
      }
      this.baseTimestamp = initMoment.valueOf()
      // 初始化61个时间点：-60s ~ now
      this.options.xAxis[0].data = []
      for (let i = -60; i <= 0; i++) {
        this.options.xAxis[0].data.push(
          moment(this.baseTimestamp).add(i, 's').format('HH:mm:ss')
        )
      }
      this.options.series[0].data = new Array(61).fill(0)
      this.options.series[1].data = new Array(61).fill(0)
      this.chart.setOption(this.options)

      this.timer = setInterval(() => {
        if (!this.chart) return
        this.options.xAxis[0].data.shift()
        this.options.series[0].data.shift()
        this.options.series[1].data.shift()
        // ✅修复：不再拿数组末尾字符串+1s，基于基准时间戳取真实当前时间
        const realNow = moment(Date.now())
        this.options.xAxis[0].data.push(realNow.format('HH:mm:ss'))
        this.options.series[0].data.push(this.ethRateNum)
        this.options.series[1].data.push(this.rateNum)
        this.chart.setOption(this.options)
      }, 1000)
    },
    reSizeChart() {
      if (this.chart) {
        this.chart.resize()
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 250px;
  margin: 0 auto;
}
</style>
