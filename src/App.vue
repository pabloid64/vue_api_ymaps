<template>
  <div id="app">
    <yandex-map 
    :coords="startCoord"
    :zoom="12" 
    :use-object-manager="true"
  >
    <ymap-marker 
      :coords="coords" 
      marker-id="1"
      marker-type="Polyline"
    />
    <ymap-marker 
      :coords="markerCoord" 
      marker-id="2" 
      hint-content="В пути" 
    />
    <button @click = 'pauseIs = !pauseIs' type="button" class="el-button  el-circle">{{pauseIs ? "Pause" : "Play"}}</button>
    <div>{{speed}} км/ч</div>
  </yandex-map>
  </div>
</template>

<script>
import YmapPlugin from 'vue-yandex-maps'
import Vue from 'vue'
import Sugar from 'sugar'
import { JSONDATA } from './config/json'

Vue.use(YmapPlugin, settings)

const settings = {
  apiKey: 'cd05a073-1550-4514-bca2-8c2a353608af',
  lang: 'ru_RU',
  coordorder: 'latlong'
}

let myInterval;

export default { 
  name: 'App',
  data: () => ({
    speed: 0,
    pauseIs: true,
    selectCoord: 1,  
    dateTime: [],
    startCoord: [
      55.651365, 37.610225
    ],
    markerCoord: [
      55.651365, 37.610225
    ],
    coords: [
    ]
  }),
  created(){
    for(let i=0; i < JSONDATA.length; i++){
      this.coords[i] = [JSONDATA[i][2],JSONDATA[i][1]];
      this.dateTime.push(Math.floor((Date.create(JSONDATA[i][0]).getTime() - Date.create(JSONDATA[0][0]).getTime())/(1000)))
    }
   myInterval = setInterval(this.changePlaceMarker, (this.dateTime[this.selectCoord] - this.dateTime[this.selectCoord - 1])*1000);
  },
  computed: {

  },
  methods: {
    changePlaceMarker(){
      if(this.pauseIs) {
          this.setSpeed(this.coords[this.selectCoord - 1], this.coords[this.selectCoord], this.dateTime[this.selectCoord] - this.dateTime[this.selectCoord - 1])
          this.markerCoord = this.coords[this.selectCoord];
          this.selectCoord = this.selectCoord + 1;
          clearInterval(myInterval);
          myInterval = setInterval(this.changePlaceMarker, (this.dateTime[this.selectCoord] - this.dateTime[this.selectCoord - 1])*1000);
      }
    },
    setSpeed(oldVal, newVal, time){
      const radius = 6371; // formula 
      let dLat = this.deg2rad(newVal[0] - oldVal[0]);
      let dLon = this.deg2rad(newVal[1] - oldVal[1]); 
      const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(oldVal[0])) * Math.cos(this.deg2rad(newVal[0])) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const d = radius * c; 
      
      this.speed = Math.floor(d/(time/3600));
    },
    deg2rad(deg) {
      return deg * (Math.PI/180);
    },

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
