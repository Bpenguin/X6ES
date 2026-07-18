<template>
  <div>
    <div :id="id" :class="className" style="-webkit-tap-highlight-color: transparent; user-select: none; position: relative;">
    </div>
    <div class="pri-bar-chart-arrow">
      <div @click="clickLeft">
        <svg-icon class-name="link-svg fill-color-green" :icon-class="'left-jt'"></svg-icon>
      </div>
      <div>{{dateArea}}</div>
      <div @click="clickRight">
        <svg-icon class-name="link-svg fill-color-green" :icon-class="'right-jt'"></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import moment from 'moment'
import {
  getUsageOneMonthEveryDayInfoApi,
  getUsageOneDayEveryHourInfoApi
} from '@/api/network5G'
import { number } from 'echarts/lib/export'
export default {
  name: 'DataUsageEchart',
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
    dataType: {
      type: Number,
      default: 0
    }
  },
  // computed: {
  //   dataType() {}
  // },
  watch: {
    dataType(val) {
      if (val == 1) {
        this.getDayData()
      } else {
        this.getMonthData()
      }
    }
  },
  data() {
    return {
      traffUnit: 'KB',
      chart: null,
      timer: null,
      options: {},
      dateArea: '',
      monthData: {
        currentMonth: '',
        currentYear: ''
      },
      dayData: {
        currentDate: '',
        currentYear: '',
        currentMonth: '',
        currentDay: ''
      }
    }
  },
  mounted() {
    this.monthData.currentYear = moment().format('YYYY')
    this.monthData.currentMonth = moment().format('MM')
    this.dayData.currentDate = moment().format('DD-MM-YYYY')
    this.dayData.currentYear = moment().format('YYYY')
    this.dayData.currentMonth = moment().format('MM')
    this.dayData.currentDay = moment().format('DD')
    this.initChart()
    // this.getDayData()
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
    clickLeft() {
      if (this.dataType == 1) {
        let startDayDate = moment()
          .subtract(2, 'month')
          .startOf('month')
          .format('DD-MM-YYYY')
        let currentD_M_Y =
          this.dayData.currentDay +
          '-' +
          this.dayData.currentMonth +
          '-' +
          this.dayData.currentYear
        if (startDayDate != currentD_M_Y) {
          let nextDatDate = moment(currentD_M_Y, 'DD-MM-YYYY').subtract(
            1,
            'days'
          )
          this.dayData.currentDay = nextDatDate.format('DD')
          this.dayData.currentMonth = nextDatDate.format('MM')
          this.dayData.currentYear = nextDatDate.format('YYYY')
          this.getDayData()
        }
      } else {
        let endDate = moment()
          .subtract(2, 'month')
          .startOf('month')
          .format('MM-YYYY')
        let currentM_Y =
          this.monthData.currentMonth + '-' + this.monthData.currentYear
        if (endDate != currentM_Y) {
          let beforeMonthDate = moment(currentM_Y, 'MM-YYYY').subtract(
            1,
            'months'
          )
          console.log('beforeMonthDate', beforeMonthDate.format('DD-MM-YYYY'))
          this.monthData.currentMonth = beforeMonthDate.format('MM')
          this.monthData.currentYear = beforeMonthDate.format('YYYY')
          this.getMonthData()
        }
      }
    },
    clickRight() {
      if (this.dataType == 1) {
        let endDayDate = moment().format('DD-MM-YYYY')
        let currentD_M_Y =
          this.dayData.currentDay +
          '-' +
          this.dayData.currentMonth +
          '-' +
          this.dayData.currentYear
        if (endDayDate != currentD_M_Y) {
          let nextDatDate = moment(currentD_M_Y, 'DD-MM-YYYY').add(1, 'days')
          this.dayData.currentDay = nextDatDate.format('DD')
          this.dayData.currentMonth = nextDatDate.format('MM')
          this.dayData.currentYear = nextDatDate.format('YYYY')
          this.getDayData()
        }
      } else {
        let endDate = moment().format('MM-YYYY')
        let currentM_Y =
          this.monthData.currentMonth + '-' + this.monthData.currentYear
        if (endDate != currentM_Y) {
          let nextMonthDate = moment(currentM_Y, 'MM-YYYY').add(1, 'months')
          console.log('nextMonthDate', nextMonthDate.format('DD-MM-YYYY'))
          this.monthData.currentMonth = nextMonthDate.format('MM')
          this.monthData.currentYear = nextMonthDate.format('YYYY')
          this.getMonthData()
        }
      }
    },
    // 获取小时的数据
    getDayData() {
      let year = this.dayData.currentYear
      let month = this.dayData.currentMonth
      let currentDay = this.dayData.currentDay
      let dayArrayStr = year + '-' + month + '-' + currentDay
      console.log()
      let day = moment(this.dayData.currentDay, 'DD').format('D')
      let params = { year, month, day }
      if (!this.dayData[dayArrayStr]) {
        getUsageOneDayEveryHourInfoApi(params).then((data) => {
          this.dayData[dayArrayStr] = {}
          this.dayData[dayArrayStr].traffNum = []
          this.dayData[dayArrayStr].unit = 'KB'
          if (data.retcode == 0) {
            let tempArr = []
            let transMul = 1 // 转化倍率
            data.HourList.forEach((item) => {
              tempArr.push(item.total_bytes / 1024)
            })
            let max = Math.max(...tempArr)
            console.log('max:', max)
            if (parseInt(max) < 1024) {
              this.dayData[dayArrayStr].unit = 'KB'
              transMul = 1 // 转化倍率
            } else if (parseInt(max / 1024) < 1024) {
              this.dayData[dayArrayStr].unit = 'MB'
              transMul = 2 // 转化倍率
            } else if (parseInt(max / 1024 / 1024) < 1024) {
              this.dayData[dayArrayStr].unit = 'GB'
              transMul = 3 // 转化倍率
            }
            this.options.xAxis.data = []
            this.options.series[0].data = []
            tempArr.forEach((item, index) => {
              let tempItem = item
              if (transMul == 1) {
                tempItem = item.toFixed(3)
              } else if (transMul == 2) {
                tempItem = (item / 1024).toFixed(3)
              } else if (transMul == 3) {
                tempItem = (item / 1024 / 1024).toFixed(3)
              }

              this.dayData[dayArrayStr].traffNum.push(parseFloat(tempItem))
              this.options.series[0].data.push(tempItem)
              this.options.xAxis.data.push(index)
            })
            this.traffUnit = this.dayData[dayArrayStr].unit
            this.dateArea = currentDay + '/' + month + ' ' + year
            this.options.yAxis.name = this.traffUnit
            this.chart.setOption(this.options)
          } else {
            this.chart.setOption(this.options)
          }
        })
      } else {
        this.options.xAxis.data = []
        this.options.series[0].data = []
        this.dayData[dayArrayStr].traffNum.forEach((item, index) => {
          this.options.xAxis.data.push(index)
          this.options.series[0].data.push(item)
        })
        this.traffUnit = this.dayData[dayArrayStr].unit
        this.dateArea = currentDay + '/' + month + ' ' + year
        this.options.yAxis.name = this.traffUnit
        this.chart.setOption(this.options)
      }
    },

    // 获取每天的数据
    getMonthData() {
      let year = this.monthData.currentYear
      let month = this.monthData.currentMonth
      let params = {
        year: year,
        month: month
      }
      if (!this.monthData[year + '-' + month]) {
        getUsageOneMonthEveryDayInfoApi(params).then((data) => {
          this.monthData[year + '-' + month] = {}
          this.monthData[year + '-' + month].traffNum = []
          this.monthData[year + '-' + month].unit = 'KB'
          if (data.retcode == 0) {
            let tempArr = []
            let transMul = 1 // 转化倍率
            data.DayList.forEach((item) => {
              tempArr.push(item.total_bytes / 1024)
            })
            let max = Math.max(...tempArr)
            console.log('111111111:')
            console.log('max:', max)
            if (parseInt(max) < 1024) {
              this.monthData[year + '-' + month].unit = 'KB'
              transMul = 1 // 转化倍率
            } else if (parseInt(max / 1024) < 1024) {
              this.monthData[year + '-' + month].unit = 'MB'
              transMul = 2 // 转化倍率
            } else if (parseInt(max / 1024 / 1024) < 1024) {
              this.monthData[year + '-' + month].unit = 'GB'
              transMul = 3 // 转化倍率
            }
            this.options.xAxis.data = []
            this.options.series[0].data = []
            tempArr.forEach((item, index) => {
              let tempItem = item
              if (transMul == 1) {
                tempItem = item.toFixed(3)
              } else if (transMul == 2) {
                tempItem = (item / 1024).toFixed(3)
              } else if (transMul == 3) {
                tempItem = (item / 1024 / 1024).toFixed(3)
              }
              if (tempItem == 0) tempItem = 0
              this.monthData[year + '-' + month].traffNum.push(
                parseFloat(tempItem)
              )
              if (index + 1 < 10) {
                this.options.xAxis.data.push('0' + (index + 1) + '/' + month)
              } else {
                this.options.xAxis.data.push(index + 1 + '/' + month)
              }
              this.options.series[0].data.push(tempItem)
            })
            this.traffUnit = this.monthData[year + '-' + month].unit
            let axisData = this.options.xAxis.data
            this.dateArea =
              axisData[0] + '-' + axisData[axisData.length - 1] + ' ' + year
            this.options.yAxis.name = this.traffUnit
            this.chart.setOption(this.options)
          } else {
            this.chart.setOption(this.options)
          }
        })
      } else {
        this.options.xAxis.data = []
        this.options.series[0].data = []
        this.monthData[year + '-' + month].traffNum.forEach((item, index) => {
          if (index + 1 < 10) {
            this.options.xAxis.data.push('0' + (index + 1) + '/' + month)
          } else {
            this.options.xAxis.data.push(index + 1 + '/' + month)
          }
          this.options.series[0].data.push(item)
        })
        this.traffUnit = this.monthData[year + '-' + month].unit
        let axisData = this.options.xAxis.data
        this.dateArea =
          axisData[0] + '-' + axisData[axisData.length - 1] + ' ' + year
        this.options.yAxis.name = this.traffUnit
        this.chart.setOption(this.options)
      }
    },
    // 设置chart参数使其生效
    setChartOption(data) {},
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      this.options = {
        tooltip: {
          trigger: 'axis',
          extraCssText: 'min-width:100px;',
          backgroundColor: '#ffffff',
          padding: 10,
          formatter: (params) => {
            let str = params[0].axisValueLabel + '<br />'
            // console.log(params)
            str +=
              '<div style="display: flex;"><div style="width: 70%; text-align: left; font-weight: bold;">' +
              params[0].data +
              ' ' +
              this.traffUnit +
              '</div></div>'
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
        // legend: {
        //   //图例
        //   x: 'left',
        //   y: 'top',
        //   top: 20,
        //   left: 80,
        //   itemWidth: 0,
        //   itemHeight: 0,
        //   textStyle: {
        //     fontSize: 16,
        //     color: '#8d9092'
        //   },
        //   selectedMode: false, // 是否允许点击
        //   data: [this.traffUnit] //对应series每一项中的name
        // },
        xAxis: {
          //x轴显示内容
          axisLabel: {
            interval: 6,
            showMaxLabel: true
            // interval: 'auto'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          unit: this.traffUnit,
          data: []
        },
        yAxis: {
          name: this.traffUnit,
          nameTextStyle: {
            fontSize: 18,
            color: '#8d9092'
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 16,
              color: '#fff'
            }
          }
        }, //y轴默认
        series: [
          //数据1  柱形
          {
            type: 'bar', //类型  柱形
            color: '#00dc50',
            data: [] //柱形的点
          }
        ]
      }
      if (this.dataType == 1) {
        this.getDayData()
      } else {
        this.getMonthData()
      }
      // this.chart.setOption(this.options)
    }
  }
}
</script>
<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 400px;
  margin: 0 auto;
}
.pri-bar-chart-arrow {
  display: flex;
  justify-content: space-between;
  // position: relative;
  bottom: 35px;
  padding: 0 10%;
  width: 100%;
}
.link-svg {
  width: 24px;
  height: 24px;
}
.fill-color-green {
  fill: $light-style-color;
}
</style>
