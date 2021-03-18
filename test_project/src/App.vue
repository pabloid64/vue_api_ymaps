<template>
  <div id="app">
    <yandex-map 
    :coords="startcoord"
    :zoom="12" 
    :use-object-manager="true"
  >
    <ymap-marker 
      :coords="coords" 
      marker-id="1"
      marker-type="Polyline"
      :properties="properties" 
    />
    <ymap-marker 
      :coords="markercoord" 
      marker-id="2" 
      hint-content="В пути" 
    />
    <button @click = 'pauseIs = !pauseIs' ></button>
  </yandex-map>
  </div>
</template>

<script>

// import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import YmapPlugin from 'vue-yandex-maps'
import Vue from 'vue'
import Sugar from 'sugar'


const settings = {
  apiKey: 'cd05a073-1550-4514-bca2-8c2a353608af',
  lang: 'ru_RU',
  coordorder: 'latlong'
}

Vue.use(YmapPlugin, settings)

import { JSONDATA } from './config/json'

export default {
  
  name: 'App',
  data: () => ({
    properties: {
      distance: {},
      duration: {}
    },
    pauseIs: true,
    selectCoord: 1,
    currentTime: 0,  
    dateStart: "2019-06-28T07:33:03",
    dateEnd: "2019-06-28T07:34:04",
    dateTime: [],
    jsonData: [],
    startcoord: [
      55.651365, 37.610225
    ],
    markercoord: [
      55.651365, 37.610225
    ],
    coords: [
    ]
  }),
  created(){
   this.jsonData = JSONDATA;
    for(let i=0; i < this.jsonData.length; i++){
      this.coords[i] = [this.jsonData[i][2],this.jsonData[i][1]];
      this.dateTime.push(Math.floor((Date.create(this.jsonData[i][0]).getTime() - Date.create(this.dateStart).getTime())/(1000)))
    }

    setInterval(this.changePlaceMarker, (this.dateTime[this.selectCoord] - this.dateTime[this.selectCoord - 1])*1000);
  },
  methods: {
    changePlaceMarker(){
      console.log(this.dateTime[this.selectCoord - 1]);
      console.log(this.dateTime[this.selectCoord]);
      console.log(this.dateTime[this.selectCoord] - this.dateTime[this.selectCoord - 1]);
      console.log('Работает!');
      if(this.pauseIs) {
          this.markercoord = this.coords[this.selectCoord];
          this.selectCoord = this.selectCoord + 1;
          console.log('Работает2!');
      }
    }
  }
}
</script>

<style>
#app {
  width: 90%;
  height: 90vh;
}

.ymap-container {
  height: 90%;
}
button {
  position: absolute;
  font-weight: 700;
  color: white;
  text-decoration: none;
  padding: .8em 1em calc(.8em + 3px);
  border-radius: 3px;
  background: rgb(64,199,129);
  box-shadow: 0 -3px rgb(53,167,110) inset;
  transition: 0.2s;
} 
button:hover { background: rgb(53, 167, 110); }
button:active {
  background: rgb(33,147,90);
  box-shadow: 0 3px rgb(33,147,90) inset;
}
</style>
