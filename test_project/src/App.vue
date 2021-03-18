<template>
  <div id="app">
    <yandex-map 
    :coords="coords"
    :zoom="10" 
    @click="onClick"
  >
    <ymap-marker 
      :coords="coords" 
      marker-id="123" 
      hint-content="some hint" 
    />
  </yandex-map>
  </div>
</template>

<script>

// import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import YmapPlugin from 'vue-yandex-maps'
import Vue from 'vue'

const settings = {
  apiKey: 'cd05a073-1550-4514-bca2-8c2a353608af',
  lang: 'ru_RU',
  coordorder: 'latlong'
}

Vue.use(YmapPlugin, settings)


export default {
  
  name: 'App',
  components: { 
    // yandexMap, 
    // ymapMarker 
  },
  data: () => ({
    coords: [
      54.82896654088406,
      39.831893822753904,
    ],
  }),
  methods: {
    onClick(e) {
      this.coords = e.get('coords');
    },
  }

}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}

.ymap-container {
  height: 100%;
}
</style>
