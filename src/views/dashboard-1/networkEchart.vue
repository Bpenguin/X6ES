<template>
  <div :id="id" :class="className" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;">
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
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
    }
  },
  data() {
    return {
      chart: null,
      timer: null,
      options: {},
      currentRate: 0
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    clearInterval(this.timer)
    this.timer = null
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
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
            // console.log(params)
            str +=
              '<div style="display: flex;"><div style="padding-right: 5px; background-color: #00752b; border-radius: 60%; width: 12px; height: 12px; margin: auto 10px auto auto;"></div><div style="width: 50px; text-align: left;">' +
              params[0].seriesName +
              '</div><div style="width: 70%; text-align: right; font-weight: bold;">' +
              params[0].data +
              ' Kbps</div></div>'
            return str
          },
          textStyle: {
            //提示框内文字样式的设置
            color: 'black'
          },
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          // top: 20,
          x: 'left',
          y: 'top',
          icon: 'rect',
          top: 20,
          left: 40,
          itemWidth: 30,
          itemHeight: 15,
          itemGap: 13,
          data: ['WAN'],
          selectedMode: false, // 是否允许点击
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
          containLabel: true
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
              interval: 3
              // interval: 10
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
                      color: 'rgba(0, 200, 236, 0.5)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(0, 200, 236, 0.5)'
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
                color: '#00752b',
                borderColor: '#00752b',
                borderWidth: 6
              }
            },
            data: []
          }
        ]
      }
      let currentTime = moment(Date.now()).format('HH:mm:ss')
      console.log('currentTime:', currentTime)
      let startTime = moment(currentTime, 'HH:mm:ss')
        .subtract(1, 'm')
        .subtract(1, 's')

      this.options.xAxis[0].data = new Array(61).fill(0).map(() => {
        return startTime.add(1, 's').format('HH:mm:ss')
      })
      // console.log('this.options.xAxis.data:', this.options.xAxis.data)
      this.options.series[0].data = new Array(61).fill(0)
      this.chart.setOption(this.options)
      this.timer = setInterval(() => {
        this.options.xAxis[0].data.shift()
        this.options.series[0].data.shift()
        let newTime = moment(this.options.xAxis[0].data.slice(-1), 'HH:mm:ss')
          .add(1, 's')
          .format('HH:mm:ss')
        this.options.xAxis[0].data.push(newTime)
        this.options.series[0].data.push(this.rateNum)
        console.log(this.rateNum, 'this.rateNum')
        this.chart.setOption(this.options)
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 250px;
}
</style>
