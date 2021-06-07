app.conf = {
  nodes: {
    min: 2,
    max: 10,
    default: 3
  }
}

app.markovChain = new Vue({
  el: '#app-markov',
  data: {
    nodes: {
      min: app.conf.nodes.min,
      max: app.conf.nodes.max,
      default: app.conf.nodes.default
    },
    matrix: []
  },
  methods: {
    getMatrix: function (orden) {
      orden = orden || app.conf.nodes.default
      let matrix = []
      for (let i = 0; i < orden; ++i) {
        matrix[i] = []
        for (let j = 0; j < orden; ++j) {
          matrix[i][j] = ''
        }
      }

      this.matrix = matrix
    }
  },
  computed: {},
  created: function () {
    this.getMatrix()
  }
})

const c = document.getElementById('input-slider-range')
var f = [document.getElementById('input-slider-range-value-low')]

noUiSlider.create(c, {
  start: [app.conf.nodes.default],
  step: 1,
  connect: true,
  tooltips: true,
  range: {
    min: app.conf.nodes.min,
    max: app.conf.nodes.max
  }
})
c.noUiSlider.on('update', function (a, b) {
  f[b].textContent = a[b]
  app.markovChain.getMatrix(+a[b])
})
