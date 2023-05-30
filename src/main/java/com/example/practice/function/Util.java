package com.example.practice.function;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


import java.io.File;
import java.io.IOException;
import java.util.Arrays;


public class Util {
    public void jsonToObject(String str) throws JsonProcessingException, JsonMappingException, IOException {

        ObjectMapper objectMapper = new ObjectMapper();

        Node[] nodeArr = objectMapper.readValue(str, Node[].class);

        System.out.println(nodeArr[0]);


    }
}
