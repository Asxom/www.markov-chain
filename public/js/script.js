app.config = {
  rowText: 6
}
app.utils = {
  toFloat: function (x) {
    return parseFloat(x.replace(/\,/g, '.'))
  },
  normalizeMatrix: function (stringMatrix) {
    let matrix = []
    let arr = stringMatrix.split(/\n/g)

    if (arr) {
      for (let i = 0; i < arr.length; ++i) {
        let rowRaw = arr[i].trim().split(/\s/g)
        if (rowRaw != '') {
          matrix[i] = rowRaw.map(app.utils.toFloat)
        }
      }
    } else {
      return []
    }

    return matrix
  },
  normalizeProbabilityVector: function (stringP) {
    let p = stringP.trim().split(/\s/g)

    if (p) {
      return p.map(app.utils.toFloat)
    } else {
      return []
    }
  },
  math: {
    matrix: {
      multiply: function (objA, objB) {
        return math.multiply(objA, objB)
      }
    }
  }
}

app.markovChain = new Vue({
  el: '#app-markov',
  data: {
    nodes: 0,
    p_n: '',
    pMatrix: `0,2 0,8\n0,3 0,7`,
    matrix: [],
    p_0: [],
    resultsP_n: [],
    pow: 1,
    controls:{
      textAreaRows: app.config.rowText
    }
  },
  created: function () {
    this.p_0 = app.utils.normalizeProbabilityVector(this.p_n)
    this.matrix = app.utils.normalizeMatrix(this.pMatrix)
  },
  methods: {
    calculateMatrix: function () {
      this.resultsP_n = []
      let p_i = this.p_0

      for (let i = 0; i < this.pow; ++i) {
        p_i = app.utils.math.matrix.multiply(p_i, this.matrix)
        this.resultsP_n.push(p_i)
      }
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
  watch: {
    p_n: function (val) {
      this.p_0 = app.utils.normalizeProbabilityVector(val)
    },
    pMatrix: function (val) {
      this.matrix = app.utils.normalizeMatrix(val)
    }
  }
})

$(
  (function () {
    let textArea = document.getElementById('text-area')
    let tableMatrix = document.getElementById('preview-matrix')

    tableMatrix.style.height = textArea.offsetHeight + 'px'
  })()
)
