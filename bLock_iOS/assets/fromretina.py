#!/usr/bin/python
 
import Image
import glob, os
import re

import sys
import os
import time
import shutil
import subprocess
import datetime

for infile in glob.glob("*png*"):
	# print infile
	m = re.search("^(.*)\.(.*)$", infile)
	file = m.group(1)
	ext = m.group(2)
	
	outfile = "./export/" + file + "@2x.png"
 	im = Image.open(infile)
 	width, height = im.size
 	resized = im.resize( (width, height), Image.ANTIALIAS)
 	resized.save(outfile, "PNG")

	outfile = "./export/" + file + ".png"
 	im = Image.open(infile)
 	width, height = im.size
	resized = im.resize((width / 2, height / 2), Image.ANTIALIAS)
 	resized.save(outfile, "PNG")
 	
	print "Converting %s to %s" % (infile, outfile)
