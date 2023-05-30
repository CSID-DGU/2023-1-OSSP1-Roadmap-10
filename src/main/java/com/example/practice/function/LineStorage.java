package com.example.practice.function;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.ApplicationScope;

import java.io.Serializable;

@Component
@ApplicationScope
public class LineStorage implements Serializable {
    private String line;

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

}
