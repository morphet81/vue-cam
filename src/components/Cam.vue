<template>
  <div>
      <video ref="video" class="_vc-video vc-video" :style="videoStyle" :width="width" :height="height" webkit-playsinline></video>
      <canvas ref="canvas" :width="width" :height="height" v-show="false"></canvas>
  </div>
</template>

<script>

export default {
  name: 'Cam',
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 640
    },
    height: {
      type: Number,
      default: 480
    },
    fit: {
      type: String,
      default: 'cover',
      validator: function (value) {
        return ['cover', 'contain'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    video () {
      return this.$refs.video
    },
    videoStyle () {
      return {
        'object-fit': this.fit
      }
    }
  },
  methods: {
    calculateVideoPreviewSize () {
      let video = this.$refs.video
      var videoPreviewSize = {
        width: video.videoWidth,
        height: video.videoHeight,
      }

      let previewRatio = this.width / this.height
      let videoRatio = video.videoWidth / video.videoHeight

      // Set video preview size with width as a reference
      let widthFirst = () => {
        videoPreviewSize.width = this.width
        videoPreviewSize.height = video.videoHeight * this.width / video.videoWidth
      }

      // Set video preview size with height as a reference
      let heightFirst = () => {
        videoPreviewSize.height = this.height
        videoPreviewSize.width = video.videoWidth * this.height / video.videoHeight
      }

      if (this.fit == 'contain') {
        if ((previewRatio < 1 && videoRatio < 1) || (previewRatio <= 1 && videoRatio >= 1)) {
          widthFirst()
        } else {
          heightFirst()
        }
      } else if (this.fit == 'cover') {
        if ((previewRatio < 1 && videoRatio < 1) || (previewRatio <= 1 && videoRatio >= 1)) {
          heightFirst()
        } else {
          widthFirst()
        }
      }

      return videoPreviewSize
    },
    snapshot () {
      var video = this.$refs.video
      var canvas = this.$refs.canvas
      var context = canvas.getContext('2d')

      var videoPreviewSize = this.calculateVideoPreviewSize()

      // Draw the image
      let topOffset = (this.height - videoPreviewSize.height) / 2
      let leftOffset = (this.width - videoPreviewSize.width) / 2
      context.drawImage(video, leftOffset, topOffset, this.width - leftOffset * 2, this.height - topOffset * 2)

      // Return a base 64 snapshot
      return canvas.toDataURL()
    }
  },
  mounted () {
    var video = this.$refs.video

    // Get permission to use the camera
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia ({ 
        video: true
      })
      .then (stream => {
        video.srcObject = stream

        if (this.autoplay) {
          video.play()
        }
      })
      .catch (error => {
        throw new Error(error);
      })
    }
  }
}
</script>

<style>

</style>
