

const XLSX = require('xlsx');


const NUM_NODES = 164;
const INF = Number.MAX_VALUE;

// Node structure to represent connected nodes and their distances
class Edge {
    constructor(node, distance) {
        this.node = node;
        this.distance = distance;
        this.next = null;
    }
}

// Function to find the node with the minimum distance value
function minDistance(dist, visited, n) {
    let min = INF;
    let minIndex;

    for (let v = 0; v < n; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }

    return minIndex;
}

// Function to print the shortest path from the source to the target
function printPath(parent, j, nodeNames) {
    const path = [];
    let current = j;

    while (current !== -1) {
        path.unshift(nodeNames[current]);
        current = parent[current];
    }

    process.stdout.write(`${path.join(' ')} `);
}


// Function to print the final distance and shortest path
function printSolution(dist, parent, src, target, nodeNames) {
    process.stdout.write(`Shortest Path from ${nodeNames[src]} to ${nodeNames[target]}:\n`);
    process.stdout.write(`Distance: ${dist[target].toFixed(2)}\n`);
    process.stdout.write("Path: ");
    printPath(parent, target, nodeNames);
    process.stdout.write("\n");
}

// Dijkstra's algorithm implementation using adjacency list representation
function dijkstra(graph, src, target, n, nodeNames) {
    const dist = new Array(n).fill(INF); // Stores the shortest distance from src to i
    const visited = new Array(n).fill(false); // Keeps track of visited nodes
    const parent = new Array(n); // Stores the shortest path tree

    // Initialize all distances as INFINITE and visited[] as false
    for (let i = 0; i < n; i++) {
        dist[i] = INF;
        visited[i] = false;
    }

    // Distance of source vertex from itself is always 0
    dist[src] = 0;
    parent[src] = -1; // Source node has no parent

    // Find the shortest path
    for (let count = 0; count < n - 1; count++) {
        const u = minDistance(dist, visited, n);
        visited[u] = true;

        // Update dist[v] only if it's not visited and the total weight of the path from src to v through u is smaller than the current value of dist[v]
        let edge = graph[u];
        while (edge !== null) {
            const v = edge.node;
            const weight = edge.distance;
            if (!visited[v] && dist[u] !== INF && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                parent[v] = u;
            }
            edge = edge.next;
        }
    }

    printSolution(dist, parent, src, target, nodeNames);
}

function addEdge(graph, src, dest, distance) {
    const newEdge = new Edge(dest, distance);

    if (graph[src] === undefined) {
        graph[src] = newEdge;
    } else {
        let curr = graph[src];

        // Check if the linked list is empty
        if (curr === null) {
            graph[src] = newEdge;
        } else {
            // Find the last edge in the linked list
            while (curr.next !== null) {
                curr = curr.next;
            }

            // Add the new edge to the end of the linked list
            curr.next = newEdge;
        }
    }
}

// Create the graph and populate it with edges from the Excel data
function createGraph(nodeNames, edges) {
    const graph = new Array(NUM_NODES).fill(null);

    for (const edge of edges) {
        const src = nodeNames.indexOf(edge.src);
        const dest = nodeNames.indexOf(edge.dest);
        const distance = edge.distance;

        addEdge(graph, src, dest, distance);
    }

    return graph;
}

// Read the node names and edge data from the Excel file
function readExcelData(filename) {
    const workbook = XLSX.readFile(filename);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    const nodeNames = [];
    const edges = [];

    let row = 2; // Start reading from row 2

    while (true) {
        const code = worksheet[`A${row}`]?.v;
        if (!code) {
            break; // Exit the loop if no more codes are found
        }

        nodeNames.push(code);

        let col = 7; // Start reading connected nodes from column 7

        while (true) {
            const connectedNode = worksheet[XLSX.utils.encode_cell({ r: row - 1, c: col - 1})]?.v;
            const realizedDistance = worksheet[XLSX.utils.encode_cell({ r: row - 1, c: col + 4 })]?.v;

            if (!connectedNode || !realizedDistance) {
                break; // Exit the inner loop if no more connected nodes and distances are found
            }

            const distance = parseFloat(realizedDistance);
            edges.push({ src: code, dest: connectedNode, distance });

            col += 6; // Move to the next set of connected node and distance columns
        }

        row++;
    }

    return { nodeNames, edges };
}

// Example usage
const filename = '';
const { nodeNames, edges } = readExcelData(filename);
const graph = createGraph(nodeNames, edges);
const src = nodeNames.indexOf('D1');
const target = nodeNames.indexOf('D7');
dijkstra(graph, src, target, NUM_NODES, nodeNames);