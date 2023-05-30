package com.example.practice.controller;

import com.example.practice.function.LineStorage;
import com.example.practice.function.Util;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class MainController {

    private final LineStorage lineStorage;

    @Autowired
    public MainController(LineStorage lineStorage) {
        this.lineStorage = lineStorage;
    }

    @GetMapping("map")
    public void datainsert(@RequestParam Integer id, @RequestParam String title) {
        System.out.println(id);
        System.out.println(title);

        String line = lineStorage.getLine();

        Util util = new Util();

        try{
            util.jsonToObject(line);
        } catch (IOException e) {
            e.printStackTrace();
        }


    }

}
