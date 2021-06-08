app.conf = {
  nodes: {
    min: 2,
    max: 10,
    default: 3
  }
}
app.graph = {
  cy: cytoscape({
    container: document.getElementById('cy'),
    zoomingEnabled: false,
    style: [
      {
        selector: 'node',
        style: {
          content: 'data(id)'
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          content: 'data(id)'
        }
      }
    ],
    elements: {
      nodes: [{ data: { id: 'a' } }, { data: { id: 'b' } }],
      edges: [{ data: { id: 'ab', source: 'a', target: 'b' } }]
    },
    layout: {
      name: 'grid'
    }
  })
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
          matrix[i][j] = {
            value: 0
          }
        }
      }
      //this.addNodes(matrix)
      this.matrix = matrix
    },
    addNodes: function (matrix) {
      for (let i = 0; i < matrix.length; ++i) {
        app.graph.cy.add({
          group: 'nodes',
          id: '' + i
        })
      }
    }
  },
  computed: {},
  created: function () {
    this.getMatrix()
  }
})

Vue.component('c-cell', {
  props: ['title', 'value'],
  template: `
   <td class='border-0'>
     <input
       style='min-width: 100px;'
       type='number'
       class='form-control'
       :value="value"
       @input="$emit('input', $event.target.value)"
       :title="title"
       placeholder=""
     />
     <small class='form-text text-muted'>
      {{title}}
     </small>
   </td>
   `
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
