#!/bin/bash
java org.antlr.v4.Tool Little.g4
javac *.java
java Driver < $1
