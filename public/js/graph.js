document.addEventListener('DOMContentLoaded', function () {
  cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    layout: {
      name: 'avsdf',
      nodeSeparation: 300
    },
    style: [
      {
        selector: 'node',
        style: {
          label: 'data(id)',
          'text-valign': 'center',
          color: '#fff',
          'background-color': '#8DAE56'
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          label: 'data(weight)',
          width: 2,
          'line-color': '#B2BABB',
          'color':'#000',
          opacity: 0.5
        }
      }
    ]
  })

  app.markovChain.drawGraph()
})
