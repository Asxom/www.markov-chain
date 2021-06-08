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

const autoLoad = (function () {})()
