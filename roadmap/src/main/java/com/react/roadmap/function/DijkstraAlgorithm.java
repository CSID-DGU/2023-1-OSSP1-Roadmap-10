package com.react.roadmap.function;

import java.util.*;

public class DijkstraAlgorithm {
    public List<String> findShortestPath(Node[] nodes, String startNode, String finishNode) {
        Map<String, Double> distanceMap = new HashMap<>();
        Map<String, String> previousNodeMap = new HashMap<>();

        for (Node node : nodes) {
            if (node.getCode().equals(startNode)) {
                distanceMap.put(node.getCode(), 0.0);
            } else {
                distanceMap.put(node.getCode(), Double.POSITIVE_INFINITY);
            }
        }

        PriorityQueue<Node> priorityQueue = new PriorityQueue<>(Comparator.comparingDouble(node -> distanceMap.get(node.getCode())));

        for (Node node : nodes) {
            if (node.getCode().equals(startNode)) {
                priorityQueue.offer(node);
                break;
            }
        }

        List<String> visitedNodes = new ArrayList<>();

        while (!priorityQueue.isEmpty()) {
            Node currentNode = priorityQueue.poll();

            if (currentNode.getCode().equals(finishNode)) {
                break;
            }

            visitedNodes.add(currentNode.getCode());  // Track the visited nodes

            for (int i = 0; i < 8; i++) {
                String neighborCode = getNodeProperty(currentNode, "nearNode" + i);
                if (neighborCode != null && distanceMap.containsKey(neighborCode)) {
                    double edgeWeight = getNodePropertyDouble(currentNode, "weight" + i);
                    double currentDistance = distanceMap.get(currentNode.getCode());
                    double neighborDistance = distanceMap.get(neighborCode);

                    // Check if the neighbor node's centralNode value is "O"
                    String neighborCentralNode = getNodeProperty(getNodeByCode(nodes, neighborCode), "centralNode");
                    if (neighborCentralNode != null && neighborCentralNode.equals("O")) {
                        if (neighborCode.equals(finishNode) || currentNode.getCode().equals(finishNode)) {
                             // Skip this neighbor node if it's the finish node or if the current node is the finish node
                        } else if (!currentNode.getCode().equals(startNode)) {
                            continue; // Skip this neighbor node if it's not the start node
                        } else{
                            continue;
                        }
                    }

                    double newDistance = currentDistance + edgeWeight;

                    if (newDistance < neighborDistance) {
                        distanceMap.put(neighborCode, newDistance);
                        previousNodeMap.put(neighborCode, currentNode.getCode());
                        priorityQueue.offer(getNodeByCode(nodes, neighborCode));
                    }
                }
            }
        }

        List<String> shortestPath = new ArrayList<>();
        String currentNodeCode = finishNode;

        while (currentNodeCode != null) {
            shortestPath.add(currentNodeCode);
            currentNodeCode = previousNodeMap.get(currentNodeCode);
        }

        Collections.reverse(shortestPath);  // Reverse the list to get the correct order


        return shortestPath;
    }



    private String getNodeProperty(Node node, String propertyName) {
        try {
            return (String) node.getClass().getMethod("get" + capitalizeFirstLetter(propertyName)).invoke(node);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private double getNodePropertyDouble(Node node, String propertyName) {
        try {
            return (double) node.getClass().getMethod("get" + capitalizeFirstLetter(propertyName)).invoke(node);
        } catch (Exception e) {
            e.printStackTrace();
            return 0.0;
        }
    }

    private Node getNodeByCode(Node[] nodes, String code) {
        for (Node node : nodes) {
            if (node.getCode().equals(code)) {
                return node;
            }
        }
        return null;
    }

    private String capitalizeFirstLetter(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
