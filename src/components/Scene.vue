<template>
  <div class="Scene">
    x: <input type="number" v-model="sphere.position.x" /> visible:
    <input type="checkbox" v-model="sphere.visible" />

    <canvas
      id="renderCanvas"
      ref="canvas"
      class="Scene-canvas"
      touch-action="none"
      oncontextmenu="return false"
    ></canvas>

    <Sphere v-if="sphere.visible" :value="sphere" />
  </div>
</template>

<script>
import {
  Engine,
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  PointLight
} from '@babylonjs/core'

import Sphere from '@/components/Sphere'

export default {
  name: 'Scene',
  components: { Sphere },

  provide() {
    return {
      babylon: this.babylon
    }
  },

  data() {
    return {
      babylon: {
        scene: undefined,
        sceneReady: false,
        canvas: undefined
      },

      sphere: {
        visible: true,
        position: {
          x: 0,
          y: 0,
          z: 0
        }
      }
    }
  },

  mounted() {
    this.createScene()

    this.babylon.sceneReady = true
    this.babylon.canvas = this.$refs.canvas
  },

  beforeDestroy() {
    this.babylon.scene.dispose()
    this.engine.dispose()
  },

  methods: {
    createScene() {
      // Create render loop, a camera and some basic lights:
      this.engine = new Engine(
        this.$refs.canvas,
        true,
        { preserveDrawingBuffer: true },
        false
      )

      this.babylon.scene = new Scene(this.engine)

      var camera = new ArcRotateCamera(
        'Camera',
        Math.PI / 2,
        Math.PI / 2,
        2,
        Vector3.Zero(),
        this.babylon.scene
      )
      camera.attachControl(this.$refs.canvas, true)

      new HemisphericLight('light1', new Vector3(1, 1, 0), this.babylon.scene)
      new PointLight('light2', new Vector3(0, 1, -1), this.babylon.scene)

      this.engine.runRenderLoop(() => {
        this.babylon.scene.render()
      })
    },

    layout() {
      if (this.engine) this.engine.resize()
    }
  }
}
</script>

<style lang="scss">
.Scene {
  position: relative;
  width: 100%;
  height: 100%;
}

.Scene-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  outline: none;
  display: block;
}
</style>
