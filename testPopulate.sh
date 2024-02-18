#! /bin/bash

num_files=15

for ((i = 1; i <= num_files; i++));
do
	touch "wwwroot/testFile$i.txt"
done


