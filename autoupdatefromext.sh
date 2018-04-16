#!/bin/bash
EXPORT DISPLAY=:0

cd /home/pi/screensaver


import_folder="screensaver_update"

for i in ./media/* ; do
	
  if [ -d "$i/$import_folder/" ]; then
	
	echo "$i/$import_folder"
	gcp --force --recursive "$i/$import_folder/"* ./
	

  fi


  for j in "$i/"* ; do

     if [ -d "$j/$import_folder/" ]; then

        echo "$j/$import_folder"
	gcp --force --recursive "$j/$import_folder/"* ./
	
   
    fi

  done 


done

chmod +x ./*
./screensaver.sh
