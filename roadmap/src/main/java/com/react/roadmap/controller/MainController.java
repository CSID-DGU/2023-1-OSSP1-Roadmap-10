package com.react.roadmap.controller;

import com.react.roadmap.function.AppRunner;
import com.react.roadmap.function.DijkstraAlgorithm;
import com.react.roadmap.function.GetLatLng;
import com.react.roadmap.function.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MainController {

    private final AppRunner appRunner;
    // Create an instance of the DijkstraAlgorithm class
    DijkstraAlgorithm dijkstraAlgorithm = new DijkstraAlgorithm();


    @Autowired
    public MainController(AppRunner appRunner) {
        this.appRunner = appRunner;
    }

    @GetMapping("map")
    public List<List<Double>> dataInsert(@RequestParam String start, @RequestParam String finish) {
        System.out.println("Start: " + start);
        System.out.println("Finish: " + finish);
        Node[] nodeArr = appRunner.getNodeArr();

        // Call the findShortestPath method and specify the start and finish nodes
        List<String> shortestPath = dijkstraAlgorithm.findShortestPath(nodeArr, start, finish);

        GetLatLng getLatLng = new GetLatLng();

        List<List<Double>> dLatLng = getLatLng.getLatLng(nodeArr, shortestPath);

        System.out.println("Shortest Path: " + shortestPath);
        System.out.println("dLatLng: " + dLatLng);

        return dLatLng;
    }


}
