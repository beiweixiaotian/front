<template>
  <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div v-loading="this.loading" style="width: 100%; background-color: #F7F7F7; overflow: hidden">
    <div style="width: 1200px; height: 1500px; background-color: #FFFFFF; margin: 25px auto">
      <div id="chart1" style="width: 1200px; height: 600px;">

      </div>
<!--      <div id="chart2" >-->

<!--      </div>-->
    </div>
  </div>
</template>

<script >

import axios from "axios";
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  GridComponent,
  DataZoomComponent,
  TooltipComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import 'echarts/extension/bmap/bmap'
import { ScatterChart, EffectScatterChart, CustomChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
// import { Bmap } from "http://api.map.baidu.com/api?v=3.0&ak=cw2iAyV27Ga0NTZO4nMoyxuz26rLNMai"

export default {
  mounted() {
    this.loading = true;
    axios.post('http://localhost:8080/getSalByName').then(response=>{
      let data = response.data.data;
      console.log(data);
      echarts.use([
        TitleComponent,
        GridComponent,
        DataZoomComponent,
        BarChart,
        CanvasRenderer
      ]);

      let chartDom = document.getElementById('chart1');
      let myChart = echarts.init(chartDom);
      let option;

// prettier-ignore

      let dataAxis = ['数据分析师', 'Java开发', 'Web前端', '算法工程师', 'Python', 'UI设计师', 'Android', '深度学习', '人工智能', 'PHP',
        'Hadoop', '数据开发', '电气工程师', '电子工程师', 'PLC', '测试工程师', '设备工程师', '硬件工程师', '结构工程师', '硬件工程师',
        '投资经理', '风控催收', '银行柜员', '银行销售', '信审', '信用卡', '贷款', '金融产品', '汽车金融', '金融研究', '证券交易员',
        '投资经理', '期货操盘手', '基金', '股票', '投资顾问', '信托', '典当', '担保', '信贷', '权证', '财产保险', '保险内勤','理赔精算师',
        '保险销售', '理财顾问', '查勘定损', '车险', '教师', '英语老师', '课程顾问', '教务', '美术老师', '幼教', '小学教师',
        '班主任助教', '编导', '摄影师', '编剧', '摄影', '后期制作', '制片', '记者', '剪辑', '化妆师', '广告创意', '美术指导', '策划经理',
        '文案', '广告制作', '媒介', '广告审核', '平面设计', '网页设计', '插画师', '工业设计', '视觉设计'];
      let yMax = 40000;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }
      option = {
        title: {
          text: '各类职位平均工资',
          // subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#999'
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' }
              ])
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' }
                ])
              }
            },
            data: data
          }
        ]
      };
// Enable data zoom when user click bar.
      const zoomSize = 6;
      myChart.on('click', function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        myChart.dispatchAction({
          type: 'dataZoom',
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
              dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
        });
      });
      option && myChart.setOption(option);
    })

    // axios.post('http://localhost:8080/getSalByCity').then(response=>{
    //   let values = response.data.data;
    //   echarts.use([
    //     TitleComponent,
    //     TooltipComponent,
    //     ScatterChart,
    //     EffectScatterChart,
    //     CustomChart,
    //     CanvasRenderer,
    //     UniversalTransition
    //   ]);
    //
    //   let chartDom = document.getElementById('chart1');
    //   let myChart = echarts.init(chartDom);
    //   let option;
    //
    //   let data = [
    //     // { name: '上海', value: values[0] },
    //     // { name: '北京', value: values[1] },
    //     // { name: '广州', value: values[2] },
    //     // { name: '深圳', value: values[3] },
    //     // { name: '天津', value: values[4] },
    //     // { name: '武汉', value: values[5] },
    //     // { name: '西安', value: values[6] },
    //     // { name: '成都', value: values[7] },
    //     // { name: '南京', value: values[8] },
    //     // { name: '杭州', value: values[9] },
    //     // { name: '重庆', value: values[10] },
    //     // { name: '厦门', value: values[11] },
    //
    //     { name: '上海', value: 12 },
    //     { name: '北京', value: 12 },
    //     { name: '广州', value: 12 },
    //     { name: '深圳', value: 12 },
    //     { name: '天津', value: 12 },
    //     { name: '武汉', value: 12 },
    //     { name: '西安', value: 12 },
    //     { name: '成都', value: 12 },
    //     { name: '南京', value: 12 },
    //     { name: '杭州', value: 12 },
    //     { name: '重庆', value: 12 },
    //     { name: '厦门', value: 12 },
    //   ];
    //   let geoCoordMap = {
    //     上海: [121.49, 31.40],
    //     北京: [116.23, 40.22],
    //     广州: [113.27, 23.16],
    //     深圳: [113.88, 22.55],
    //     天津: [117.31, 39.72],
    //     武汉: [114.03, 30.58],
    //     西安: [108.93, 34.23],
    //     成都: [104.10, 30.66],
    //     南京: [118.89, 31.33],
    //     杭州: [120.21, 30.21],
    //     重庆: [106.54, 29.40],
    //     厦门: [118.03, 24.48],
    //   };
    //   let convertData = function (data) {
    //     let res = [];
    //     for (let i = 0; i < data.length; i++) {
    //       let geoCoord = geoCoordMap[data[i].name];
    //       if (geoCoord) {
    //         res.push({
    //           name: data[i].name,
    //           value: geoCoord.concat(data[i].value)
    //         });
    //       }
    //     }
    //     return res;
    //   };
    //   function renderItem(params, api) {
    //     var coords = [
    //       [121.49, 31.40],
    //       [116.23, 40.22],
    //       [113.27, 23.16],
    //       [113.88, 22.55],
    //     ];
    //     var points = [];
    //     for (var i = 0; i < coords.length; i++) {
    //       points.push(api.coord(coords[i]));
    //     }
    //     var color = api.visual('color');
    //     return {
    //       type: 'polygon',
    //       shape: {
    //         points: echarts.graphic.clipPointsByRect(points, {
    //           x: params.coordSys.x,
    //           y: params.coordSys.y,
    //           width: params.coordSys.width,
    //           height: params.coordSys.height
    //         })
    //       },
    //       style: api.style({
    //         fill: color,
    //         stroke: echarts.color.lift(color)
    //       })
    //     };
    //   }
    //   option = {
    //     backgroundColor: 'transparent',
    //     title: {
    //       text: '全国部分城市平均工资',
    //       // subtext: 'data from PM25.in',
    //       // sublink: 'http://www.pm25.in',
    //       left: 'center',
    //       textStyle: {
    //         color: '#fff'
    //       }
    //     },
    //     tooltip: {
    //       trigger: 'item'
    //     },
    //     bmap: {
    //       center: [104.114129, 37.550339],
    //       zoom: 5,
    //       roam: true,
    //       mapStyle: {
    //         styleJson: [
    //           {
    //             featureType: 'water',
    //             elementType: 'all',
    //             stylers: {
    //               color: '#044161'
    //             }
    //           },
    //           {
    //             featureType: 'land',
    //             elementType: 'all',
    //             stylers: {
    //               color: '#004981'
    //             }
    //           },
    //           {
    //             featureType: 'boundary',
    //             elementType: 'geometry',
    //             stylers: {
    //               color: '#064f85'
    //             }
    //           },
    //           {
    //             featureType: 'railway',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'highway',
    //             elementType: 'geometry',
    //             stylers: {
    //               color: '#004981'
    //             }
    //           },
    //           {
    //             featureType: 'highway',
    //             elementType: 'geometry.fill',
    //             stylers: {
    //               color: '#005b96',
    //               lightness: 1
    //             }
    //           },
    //           {
    //             featureType: 'highway',
    //             elementType: 'labels',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'arterial',
    //             elementType: 'geometry',
    //             stylers: {
    //               color: '#004981'
    //             }
    //           },
    //           {
    //             featureType: 'arterial',
    //             elementType: 'geometry.fill',
    //             stylers: {
    //               color: '#00508b'
    //             }
    //           },
    //           {
    //             featureType: 'poi',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'green',
    //             elementType: 'all',
    //             stylers: {
    //               color: '#056197',
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'subway',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'manmade',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'local',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'arterial',
    //             elementType: 'labels',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           },
    //           {
    //             featureType: 'boundary',
    //             elementType: 'geometry.fill',
    //             stylers: {
    //               color: '#029fd4'
    //             }
    //           },
    //           {
    //             featureType: 'building',
    //             elementType: 'all',
    //             stylers: {
    //               color: '#1a5787'
    //             }
    //           },
    //           {
    //             featureType: 'label',
    //             elementType: 'all',
    //             stylers: {
    //               visibility: 'off'
    //             }
    //           }
    //         ]
    //       }
    //     },
    //     series: [
    //       {
    //         name: 'sal',
    //         type: 'scatter',
    //         coordinateSystem: 'bmap',
    //         data: convertData(data),
    //         encode: {
    //           value: 2
    //         },
    //         symbolSize: function (val) {
    //           return val[2] / 10;
    //         },
    //         label: {
    //           formatter: '{b}',
    //           position: 'right'
    //         },
    //         itemStyle: {
    //           color: '#ddb926'
    //         },
    //         emphasis: {
    //           label: {
    //             show: true
    //           }
    //         }
    //       },
    //       {
    //         name: 'Top 5',
    //         type: 'effectScatter',
    //         coordinateSystem: 'bmap',
    //         data: convertData(
    //             data
    //                 .sort(function (a, b) {
    //                   return b.value - a.value;
    //                 })
    //                 .slice(0, 6)
    //         ),
    //         encode: {
    //           value: 2
    //         },
    //         symbolSize: function (val) {
    //           return val[2] / 10;
    //         },
    //         showEffectOn: 'emphasis',
    //         rippleEffect: {
    //           brushType: 'stroke'
    //         },
    //         hoverAnimation: true,
    //         label: {
    //           formatter: '{b}',
    //           position: 'right',
    //           show: true
    //         },
    //         itemStyle: {
    //           color: '#f4e925',
    //           shadowBlur: 10,
    //           shadowColor: '#333'
    //         },
    //         zlevel: 1
    //       },
    //       {
    //         type: 'custom',
    //         coordinateSystem: 'bmap',
    //         renderItem: renderItem,
    //         itemStyle: {
    //           opacity: 0.5
    //         },
    //         animation: false,
    //         silent: true,
    //         data: [0],
    //         z: -10
    //       }
    //     ]
    //   };
    //
    //   option && myChart.setOption(option);
    //
    //
    // })

    this.loading = false;
  },

  name: "Home",
  data() {
    this.loading = false;
    return {
      form: {
        job_title:'',
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      tableData: [

      ]
    }
  },
  methods: {
    search() {
      axios.post('http://localhost:8080/getJobByTitle', this.form).then(response => {

        if (response.data.state === 1) {
          this.tableData = response.data.data.content
          this.total = response.data.total
        } else {
          window.alert("无数据")
        }
      })
    },
  }
}

</script>

<script  setup>
import { Search } from '@element-plus/icons-vue'
// import { Bmap } from "http://api.map.baidu.com/api?v=3.0&ak=cw2iAyV27Ga0NTZO4nMoyxuz26rLNMai"

require('echarts/extension/bmap/bmap')
</script>