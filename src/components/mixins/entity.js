export default {
  inject: ['babylon'],

  data() {
    return {
      sceneElement: undefined
    }
  },

  props: {
    value: { type: Object, default: () => {} }
  },

  render: function(h) {
    return h('template', this.$slots.default)
  },

  async mounted() {
    await this.babylon.sceneReady
    this.addToScene()
  },

  beforeDestroy() {
    this.removeFromScene()
  },

  methods: {
    addToScene() {
      console.warn('addToScene not implemented in: ' + this.$options.name)
    },

    removeFromScene() {
      console.warn('removeFromScene not implemented in: ' + this.$options.name)
    }
  }
}
