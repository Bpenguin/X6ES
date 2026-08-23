<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="pri-main content-full-page">
    <!-- 头部视图 -->
    <section class="section-card pri-dashboard-row">
      <div class="pri-dashboard-row-title">
        <div>
          {{$t('other.Internet')}}
        </div>
      </div>
      <div class="pri-dashboard-content">
        <!-- 左侧状态图标 -->
        <div class="pri-dashboard-main">
          <div class="pri-dashboard-main-icon">
            <svg-icon v-if="connectionStatus" :icon-class="'disconnected'" class-name="link-svg fill-color-gray"></svg-icon>
            <svg-icon v-else :icon-class="'connection'" class-name="link-svg fill-light-color"></svg-icon>
          </div>
          <div class="pri-dashboard-main-text">
            <p>{{$t('other.DualWANMode')}}</p>
            <p class="pri-text-color-green">
              {{$t(dualModeData.dualModeStatus)}}
            </p>
          </div>
        </div>

        <div class="pri-dashboard-data grid-internet-container">
          <div class="pri-dashboard-data-item grid-5g">
            <div class="pri-dashboard-data-item-bg" v-if="dualModeData.PrimaryWanType == 1">
              <p class="pri-dashboard-data-item-title"><span>
                  {{$t('wan.primaryWAN')}}
                </span></p>
              <div class="pri-dashboard-data-item-content pri-dashboard-traffic">
                <div class="pri-signal-logo" style="margin: auto 0px;">
                  <div class="pri-signal-gen">
                    {{$t('nav.wan')}}
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{ethWanInfo.rx_rate}} </label>
                    <span>{{ethWanInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{ethWanInfo.tx_rate}} </label>
                    <span>{{ethWanInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{ethWanInfo.ipAddr}}</label></div>
                <div class="pri-ipv6-text"><label>{{$t('nav.ipv6')}}: {{ethWanInfo.ipv6Addr}}</label></div>
              </div>
            </div>
            <div class="pri-dashboard-data-item-bg" v-else>
              <p class="pri-dashboard-data-item-title">
                <span>
                  {{$t('wan.primaryWAN')}}
                </span>
              </p>
              <div class="pri-dashboard-data-item-content pri-dashboard-traffic">
                <div class="pri-signal-logo">
                  <div class="pri-signal-bar">
                    <svg-icon v-show="wan5GInfo.signal_level == 4" :icon-class="'client4'" class-name="client-svg"></svg-icon>
                    <svg-icon v-show="wan5GInfo.signal_level == 3" :icon-class="'client3'" class-name="client-svg"></svg-icon>
                    <svg-icon v-show="wan5GInfo.signal_level ==2" :icon-class="'client2'" class-name="client-svg"></svg-icon>
                    <svg-icon v-show="wan5GInfo.signal_level ==1" :icon-class="'client1'" class-name="client-svg"></svg-icon>
                    <svg-icon v-show='wan5GInfo.signal_level ==0' :icon-class="'client0'" class-name="client-svg"></svg-icon>
                  </div>
                  <div v-if="wan5GInfo.sim_card_state == 0">{{ $t('other.noSimText') }}</div>
                  <div v-else class="pri-signal-gen">{{ wan5GInfo.net_type == ''? $t('other.NoService'):wan5GInfo.net_type}}</div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{wan5GInfo.rx_rate}} </label>
                    <span>{{wan5GInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{wan5GInfo.tx_rate}} </label>
                    <span>{{wan5GInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{wan5GInfo.ipv4Addr}}</label></div>
                <div class="pri-ipv6-text"><label>{{$t('nav.ipv6')}}: {{wan5GInfo.ipv6Addr}}</label></div>
              </div>
            </div>
          </div>
          <div class="pri-dashboard-data-item grid-wan">
            <div class="pri-dashboard-data-item-bg" v-if="dualModeData.PrimaryWanType == 1">
              <p class="pri-dashboard-data-item-title">
                <span>
                  {{$t('wan.secondaryWAN')}}
                </span>
              </p>
              <div class="pri-dashboard-data-item-content pri-dashboard-traffic">
                <div class="pri-signal-logo">
                  <div class="pri-signal-bar">
                    <div class="pri-signal-bar">
                      <svg-icon v-show="wan5GInfo.signal_level == 4" :icon-class="'client4'" class-name="client-svg"></svg-icon>
                      <svg-icon v-show="wan5GInfo.signal_level ==3" :icon-class="'client3'" class-name="client-svg"></svg-icon>
                      <svg-icon v-show="wan5GInfo.signal_level ==2" :icon-class="'client2'" class-name="client-svg"></svg-icon>
                      <svg-icon v-show="wan5GInfo.signal_level ==1" :icon-class="'client1'" class-name="client-svg"></svg-icon>
                      <svg-icon v-show='wan5GInfo.signal_level ==0' :icon-class="'client0'" class-name="client-svg"></svg-icon>
                    </div>
                  </div>
                  <div v-if="wan5GInfo.sim_card_state == 0" class="pri-signal-gen">{{ $t('other.noSimText') }}</div>
                  <div v-else class="pri-signal-gen">{{ wan5GInfo.net_type == ''? $t('other.NoService'):wan5GInfo.net_type}}</div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{wan5GInfo.rx_rate}} </label>
                    <span>{{wan5GInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{wan5GInfo.tx_rate}} </label>
                    <span>{{wan5GInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{wan5GInfo.ipv4Addr}}</label></div>
                <div class="pri-ipv6-text"><label>{{$t('nav.ipv6')}}: {{wan5GInfo.ipv6Addr}}</label></div>
              </div>
            </div>
            <div class="pri-dashboard-data-item-bg" v-else>
              <p class="pri-dashboard-data-item-title"><span>
                  {{$t('wan.secondaryWAN')}}
                </span></p>
              <div class="pri-dashboard-data-item-content pri-dashboard-traffic">
                <div class="pri-signal-logo" style="margin: auto 0px;">
                  <div class="pri-signal-gen">
                    {{$t('nav.wan')}}
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'down'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{ethWanInfo.rx_rate}} </label>
                    <span>{{ethWanInfo.rx_unit}}</span>
                  </div>
                </div>
                <div class="pri-dashboard-traffic-value">
                  <svg-icon :icon-class="'up'" class-name="flow-dir"></svg-icon>
                  <div>
                    <label class="pri-text-color-green pri-traffic-text">{{ethWanInfo.tx_rate}} </label>
                    <span>{{ethWanInfo.tx_unit}}</span>
                  </div>
                </div>
              </div>
              <div class="pri-ip-address">
                <div class="pri-ip-text"><label>IP: {{ethWanInfo.ipAddr}}</label></div>
                <div class="pri-ipv6-text"><label>{{$t('nav.ipv6')}}: {{ethWanInfo.ipv6Addr}}</label></div>
              </div>
            </div>
          </div>
          <div class="pri-dashboard-data-item grid-dataUsage">
            <div class="pri-dashboard-data-item-bg">
              <p class="pri-dashboard-data-item-title">
                <span>
                  {{$t('other.dataUsage5G')}}
                </span>
              </p>
              <div class="pri-dashboard-data-item-content ">
                <div class="pri-dashboard-traffic dataUsage">
                  <div class="pri-dashboard-traffic-usage">
                    <p class="pri-data-box-title">
                      {{$t('other.Since')}} {{usageDatainfo.startMonth}} / {{usageDatainfo.start_date}}
                    </p>
                    <div class="pri-data-box-value">
                      <div class="pri-data-value">
                        <div class="pri-text-color-green">
                          {{usageDatainfo.used}}
                        </div>
                      </div>
                      <div>{{$t('other.UsedAmount')}}</div>
                    </div>
                  </div>
                  <div>
                    <div class="pri-data-usage-line"></div>
                  </div>
                  <div class="pri-dashboard-traffic-usage">
                    <p class="pri-data-box-title">
                      {{$t('other.Since')}} {{usageDatainfo.startMonth}} / {{usageDatainfo.start_date}}
                    </p>
                    <div class="pri-data-box-value">
                      <div class="pri-data-value">
                        <div class="pri-text-color-green">
                          {{usageDatainfo.dataRemaining}}
                        </div>
                      </div>
                      <div>{{$t('other.AvailableAmount')}}</div>
                    </div>
                  </div>
                </div>
                <div class="pri-dataUsage-note">
                  <label>{{$t('other.dataUsageDes')}}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="pri-dashboard-data-item grid-traffic">
            <div class="pri-dashboard-data-item-bg">
              <p class="pri-dashboard-data-item-title"><span>
                  {{$t('other.NetworkTraffic')}}
                </span></p>
              <div class="pri-dashboard-data-item-content">
                <network-echart v-if="showChart" :rate-num="Wan5GRateNum" :eth-rate-num="ethWanRateNum"></network-echart>
                <div class="pri-ip-address pri-speedtest">
                  <a href="https://www.speedtest.net/" target="_blank">
                    <svg-icon :icon-class="'speed'" class-name="speed-svg fill-light-color"></svg-icon>
                    {{$t('other.speedTest')}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-card pri-dashboard-row">
      <div class="pri-dashboard-row-title">
        <div>
          Acer
        </div>
      </div>
      <div class="pri-dashboard-content">
        <div class="pri-dashboard-main">
          <div class="pri-dashboard-main-icon">
            <div class="mouseMode" style="display: inline-block;" @click="goToWanDevice">
              <div class="pri-wan-icon pri-relative">
                <svg-icon :icon-class="'wan-device'" class-name="pri-device-icon fill-light-color"></svg-icon>
                <span class="pri-device-amount">{{connectDevicNum}}</span>
                <svg-icon :icon-class="'wan-right'" class-name="pri-more"></svg-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="pri-dashboard-data grid-device-container">
          <div class="pri-dashboard-data-item grid-host">
            <div class="pri-dashboard-data-item-bg">
              <p class="pri-dashboard-data-item-title">
                <span>
                  {{$t('other.HostWiFi')}}
                </span>
              </p>
              <div class="pri-dashboard-data-item-content pri-dashboard-wifi">
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-4G'" :class-name="hostWifiData.host4GStatus == 1?'flow-dir fill-light-color':'flow-dir '"></svg-icon>
                  <div class="pri-amount-circle" :class="hostWifiData.host4GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{hostWifiData.Host4GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{hostWifiData.Host4GSsid}}</div>
                </div>
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-5G'" :class-name="hostWifiData.host5GStatus == 1?'flow-dir fill-light-color':'flow-dir'"></svg-icon>
                  <div class="pri-amount-circle" :class="hostWifiData.host5GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{hostWifiData.Host5GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{hostWifiData.Host5GSsid}}</div>
                </div>
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-6G'" :class-name="hostWifiData.host6GStatus == 1?'flow-dir fill-light-color':'flow-dir'"></svg-icon>
                  <div class="pri-amount-circle" :class="hostWifiData.host6GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{hostWifiData.Host6GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{hostWifiData.Host6GSsid}}</div>
                </div>
              </div>
              <!-- <div class="pri-dashboard-wifi-steering">
                <p>Band steering: Disabled</p>
              </div> -->
            </div>
          </div>
          <div class="pri-dashboard-data-item grid-guest">
            <div class="pri-dashboard-data-item-bg">
              <p class="pri-dashboard-data-item-title">
                <span>
                  {{$t('other.GuestWiFi')}}
                </span>
              </p>
              <div class="pri-dashboard-data-item-content pri-dashboard-wifi">
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-4G'" :class-name="guestWifiData.host4GStatus == 1?'flow-dir fill-light-color':'flow-dir'"></svg-icon>
                  <div class="pri-amount-circle" :class="guestWifiData.host4GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{guestWifiData.Host4GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{guestWifiData.Host4GSsid}}</div>
                </div>
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-5G'" :class-name="guestWifiData.host5GStatus == 1?'flow-dir fill-light-color':'flow-dir'"></svg-icon>
                  <div class="pri-amount-circle" :class="guestWifiData.host5GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{guestWifiData.Host5GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{guestWifiData.Host5GSsid}}</div>
                </div>
                <div class="pri-dashboard-wifi-item">
                  <svg-icon :icon-class="'wifi-6G'" :class-name="guestWifiData.host6GStatus == 1?'flow-dir fill-light-color':'flow-dir'"></svg-icon>
                  <div class="pri-amount-circle" :class="guestWifiData.host6GStatus == 1?'priBgConnect':'unBgConnect'">
                    {{guestWifiData.Host6GNum}}
                  </div>
                  <div class="pri-dashboard-wifi-ssid">{{guestWifiData.Host6GSsid}}</div>
                </div>
              </div>
              <!-- <div class="pri-dashboard-wifi-steering">
                <p>Band steering: Disabled</p>
              </div> -->
            </div>
          </div>
          <div class="pri-dashboard-data-item grid-ports">
            <div class="pri-dashboard-data-item-bg">
              <p class="pri-dashboard-data-item-title"> {{$t('other.ethernet')}}</p>
              <div class="pri-dashboard-data-item-content pri-ports-area">
                <div class="pri-dashboard-ports">
                  <div class="pri-dashboard-ports-item pri-lan-port">
                    <svg-icon :icon-class="'port-1'" :class-name="clientStatus.lanPort1 == 1?'port-svg fill-light-color':'port-svg priFillDisconnect'"></svg-icon>
                    <svg-icon :icon-class="'port-2'" :class-name="clientStatus.lanPort2 == 1?'port-svg fill-light-color':'port-svg priFillDisconnect'"></svg-icon>
                  </div>
                  <span class="pri-amount-circle pri-lan-port-amount priBgConnect">
                    {{clientStatus.totalNum}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <mine-dialog :show-dialog='showDialogInfo.showDialog' :show-close-btn="showDialogInfo.showCloseBtn" :title="showDialogInfo.title" :msg-title="showDialogInfo.msgTitle" :left-btn-text="showDialogInfo.leftBtnText" :right-btn-text="showDialogInfo.rightBtnText" @leftBtnClick="showDialogInfo.showDialog = false" @rightBtnClick="enterPinOrPuk" @closeDialog="showDialogInfo.showDialog = false"></mine-dialog>
  </div>

</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import './index.scss';
</style>
