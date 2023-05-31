package com.example.practice.controller;

import com.example.practice.function.AppRunner;
import com.example.practice.function.DijkstraAlgorithm;
import com.example.practice.function.GetLatLng;
import com.example.practice.function.Node;
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
    public void dataInsert(@RequestParam String id, @RequestParam String title) {
        System.out.println(id);
        System.out.println(title);
        Node[] nodeArr = appRunner.getNodeArr();

        // Call the findShortestPath method and specify the start and finish nodes
        List<String> shortestPath = dijkstraAlgorithm.findShortestPath(nodeArr, id, title);

        System.out.println(shortestPath);
        System.out.println(shortestPath.size());
        System.out.println(shortestPath.get(4));
        GetLatLng getLatLng = new GetLatLng();

        System.out.println(getLatLng.getLatLng(nodeArr, shortestPath));

    }


}
