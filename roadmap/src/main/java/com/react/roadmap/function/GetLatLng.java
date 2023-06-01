package com.react.roadmap.function;
import java.util.*;
public class GetLatLng {
    public List<List<Double>> getLatLng(Node[] nodes, List<String> shortestPath){
        int line = 0;
        double dLat, dLng;
        String code;
        List<List<Double>> dLngLat = new ArrayList<>();
        for(int i = 0; i < shortestPath.size(); i++){
            List<Double> temp = new ArrayList<>();
            line = 0;
            while(true){
                code = nodes[line].getCode();
                if(code.equals(shortestPath.get(i))){
                    break;
                } else{
                    line++;
                }
            }
            dLat = Double.parseDouble(nodes[line].getLatitude());
            dLng = Double.parseDouble(nodes[line].getLongitude());
            temp.add(dLat);
            temp.add(dLng);
            dLngLat.add(temp);
        }
        return dLngLat;
    }
}