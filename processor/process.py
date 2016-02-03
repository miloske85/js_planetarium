#	Data processor for Stars
#
#	Reads raw (generated) data from hipparcos.txt and generates Javascript file where each star is represented as object

import string

from lib import hipparcos
from lib import csvMod

hipList = []	#list (of lists) that will hold data for CSV file

#Step 1: Generate CSV file from raw TXT
f = open('../data/hipparcos.txt', 'r')

for line in f:
	l = hipparcos.process(line)	#returns useful lines from raw file
	
	if bool(l) == True:
		l = hipparcos.genNumbers(l)	#turns raw values into floating point numbers
		hipList.append(l)

f.close()

#list is now generated

csvMod.writeCsv('../data/hipparcos.csv', hipList)

#correlate with names

namesList = csvMod.readCsv('../data/names.csv')

catalogList = hipparcos.matchNames(hipList,namesList)	#HIP designations replaced with names

csvMod.writeCsv('../data/catalog.csv',catalogList)

#finaly generate js code
displayList = []    #list that holds names of stars that are displayed in the front table
f = open('../data/display_list.txt','r')
for line in f:
    displayList.append(string.rstrip(line))
f.close()

hipparcos.genJS('../data/stars.js', catalogList, displayList)
