app.config = {
  rowText: 8
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
    controls: {
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
    drawGraph: function (matrix) {

      matrix = matrix || this.matrix
      cy.remove('node')
      cy.remove('edge')
      if (this.isValidMatrix) {

        let elements = []

        for (let i = 0; i < matrix.length; ++i) {
          elements.push({ group: 'nodes', data: { id: '' + i } })
          for (let j = 0; j < matrix[i].length; ++j) {

            if (matrix[i][j] != 0) {

              elements.push({
                group: 'edges',
                data: {
                  source: '' + i,
                  target: '' + j,
                  weight: '' + matrix[i][j]
                }
              })
            }
          }
        }

        var addedItems = cy.add(elements)

        var layout = cy.layout({
          name: 'avsdf',
          refresh: 1,
          animate: 'during',
          animationDuration: 1000,
          animationEasing: 'ease-in-out',
          nodeSeparation: 300
        })
        layout.run()
        cy.center()
        cy.fit(addedItems, '600px')
      }
    }
  },
  computed: {
    isValidMatrix: function () {
      let needElements = this.matrix.length * this.matrix.length
      let realCountElements = 0

      for (let i = 0; i < this.matrix.length; ++i) {
        for (let j = 0; j < this.matrix[i].length; ++j) {
          realCountElements++
        }
      }

      return needElements === realCountElements
    }
  },
  watch: {
    p_n: function (val) {
      this.p_0 = app.utils.normalizeProbabilityVector(val)
    },
    pMatrix: function (val) {
      this.matrix = app.utils.normalizeMatrix(val)
      this.drawGraph(this.matrix)
    }
  }
})
const autoLoadInputControls = (function () {
  let textArea = document.getElementById('text-area')
  let tableMatrix = document.getElementById('preview-matrix')

  tableMatrix.style.height = textArea.offsetHeight + 'px'
})()
