@echo off
docker build -t sudoku-react --target prod .
docker run -P --name sudoku-reactts sudoku-react