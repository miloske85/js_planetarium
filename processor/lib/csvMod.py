import csv

#	Module for CSV file processing
#
#	Author: Milos Milutinovic
#	Version: 0.1
#	Date: 2016-01-12

def readCsv(file):

	"""	Reads given file and returns list of lists (two dimensional)	"""

	with open(file,'rb') as csvFile:
		rawList = csv.reader(csvFile)	#not actuall list
		list = []
		
		#re-packing
		for row in rawList:
			list.append(row)
			
		return list

def writeCsv(file,content):
	"""
		Writes two dimensional list to CSV file
	"""
	
	with open(file,'wb') as csvFile:
		csvH = csv.writer(csvFile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
		
		for line in content:
			csvH.writerow(line)