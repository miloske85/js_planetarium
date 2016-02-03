import string

#	Module for processing data from http://heasarc.gsfc.nasa.gov/
#
#	Author: Milos Milutinovic
#	Date: 2016-01-15
#	Version: 0.1

def process(line):

	"""Processes lines from hipparcos.txt"""
	
	returnList = []
	status = False #if there is no 'HIP' entry in the given line, false will be returned
	
	list = string.split(line,"\t")	#watch for \t and other things
	
	#file from 2016-01-15 has the following useful columns
	# HIP, RA, DEC, PMRA, PMDEC, type, vmag
	
	#this enables ignoring of lines that contain no useful data
	for col in list:
		if string.find(col,'HIP') != -1:
			status = True

	#if line contains data, add it to list
	if status == True:
		for col in list:
			returnList.append(col)
		
	#if line had no data
	if status == False:
		return False
	
	#remove first two items
	del returnList[1]
	del returnList[0]
	
	#remove '\n' from the last item
	returnList[-1] = string.rstrip(returnList[-1])
	
	return returnList
	
def genNumbers(line):

	"""
		Processes given line (list) and returns correctly formatted numerical data
		
		This function takes value such as 00 08 23.1680 and turns it into floating point number
	"""
	
	#each line is formatted exactly the same

	ra = string.split(line[1])
	
	raN = float(ra[0]) + float(ra[1])/60.0 + float(ra[2])/3600.0
	
	dec = string.split(line[2])
	
	decN = float(dec[0]) + float(dec[1])/60.0 + float(dec[2])/3600.0
	
	pmraN = float(line[3])
	pmdecN = float(line[4])
	
	magN = float(line[6])
	
	returnList = [line[0],raN,decN,pmraN,pmdecN,line[5],magN]
	
	return returnList

def matchNames(hip,names):

	"""
		The two given lists contain hipparcos data where first column is HIP designation.
		Second list contains HIP designations and star names and constellations
		
		Produced list contains name and constellation as the first two columns and the rest of Hipparcos data as the rest
	"""
	
	returnList = []
	
	for i in hip:
		
		for j in names:
		
			if i[0] == j[0]:
				#names matched
				temp = []

				#trim whitespaces in these two fields, there could be whitespaces in names.csv file
				j[1] = string.strip(j[1])
				j[2] = string.strip(j[2])
				temp.append(j[1])
				temp.append(j[2])
				
				iTemp = i
				del iTemp[0] #remove HIP designation
				
				#merge lists
				temp = temp + iTemp
				
				returnList.append(temp)
				
	return returnList
				
def genJS(file,list,displayList):

    """
        Generates Javascript code from given star list
        
        @param string file - Filename
        @param list list - List of star data (list of lists)
        @param list displayList - List of names of stars that are to be given display attribute
    """

    stars = 'var stars = [\n'

    for line in list:
        stars += '\t{\n'
        stars += '\t\tname:"' + line[0] + '",\n' 
        stars += '\t\tconstellation:"' + line[1] + '",\n'
        stars += '\t\tRA:' + str(line[2]) + ',\n'
        stars += '\t\tDEC:' + str(line[3]) + ',\n'
        stars += '\t\tPMRA:' + str(line[4]) + ',\n'
        stars += '\t\tPMDEC:' + str(line[5]) + ',\n'
        stars += '\t\tstarClass:"' + line[6] + '",\n'
        
        #add display attrib if star is in the list
        if line[0] in displayList:
            stars += '\t\tdisplay: true,\n'
        
        stars += '\t\tmag:' + str(line[7]) + '\n'
        stars += '\t},\n'
		
    #remove the trailing comma
    stars = string.rstrip(stars) #newline
    stars = string.rstrip(stars,',') #comma

    stars += '\n];'

    f = open(file,'w')
    f.write(stars)
    f.close()