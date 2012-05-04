# Seeds mongo-db
# Created by Mario Gonzalez
import sys
import os
import time
import shutil
import subprocess
import datetime

# Provides tabbed output
def tabbed_output(tab_count, output_string):
	print (" " * (tab_count*4) ) + output_string

def display_help_and_exit():
	tabbed_output(0, "\n\n*ERROR* You must provide the location of the seed file (assumes this is being called from site root)")
	tabbed_output(1, "eg: seed_mongo_database.py --seed_location=/_db/seed.json\n")
	sys.exit()

argumentDictionary = {}
for arg in sys.argv:
  if len( arg.split("=") ) == 2: # If args has 2 parts after split at =
    argumentDictionary[arg.split("=")[0].lstrip("--")] =  arg.split("=")[1] # insert into args dictionary

# Provide instructions for running if no arguments passed
if "help" in sys.argv or len(sys.argv) == 1 or 'seed_location' not in argumentDictionary:
	display_help_and_exit();

real_seed_location = "../../" + argumentDictionary['seed_location']; 

# Open seed file
f = open(real_seed_location, "r");
contents = f.read().replace("'", '"'); # pre-escape quotes;
f.close();

final_command = "mongo --eval \"db.posts.insert(" + contents + ");\""
print final_command
os.system(final_command);
#subprocess.call(["mongo", "--eval \"printjson(db.serverStatus())\""])
