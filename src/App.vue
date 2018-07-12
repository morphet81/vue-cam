<template>
  <div id="app">
    <button @click="startCapture">Start</button>
    <vc-cam ref="camera" :width="400" :height="400" :autoplay="false"></vc-cam>
    <button @click="snapshot">Snap My Photo</button>
    <img class="thumb" :src="photo"/>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      photo: null
    }
  },
  methods: {
    startCapture () {
      this.$refs.camera.video.play()
    },
    snapshot () {
      this.photo = this.$refs.camera.snapshot()
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .thumb {
    width: 200px;
    height: 200px;
    object-fit: contain;
    border: solid 1px black;
    background-color: gainsboro;
    border-radius: 100px;
  }

  .vc-video {
    border: solid 1px red;
    border-radius: 200px;
  }
</style>
