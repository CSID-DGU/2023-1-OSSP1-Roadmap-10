package com.example.practice.function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class AppRunner implements ApplicationRunner {

    private final ResourceLoader resourceLoader;
    private final LineStorage lineStorage;

    @Autowired
    public AppRunner(ResourceLoader resourceLoader, LineStorage lineStorage) {
        this.resourceLoader = resourceLoader;
        this.lineStorage = lineStorage;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        Resource resource = resourceLoader.getResource("classpath:static/json/node.json");
        InputStream inputStream = resource.getInputStream();

        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        StringBuilder content = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            content.append(line).append("\n");
        }

        lineStorage.setLine(content.toString());
        reader.close();
        inputStream.close();
    }
}
