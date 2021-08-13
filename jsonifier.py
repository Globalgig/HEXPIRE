from openpyxl import Workbook
from openpyxl import load_workbook

workbook = load_workbook(filename="Cards.xlsx")
sheet = workbook.active

print(sheet)
escape = False
first = False
tabCount = 2

#
numberofCards = 6

def formatData(index, data, indentCount, lastElement = False):
	baseString = ''
	for x in range(indentCount):
		baseString += "\t"
	if not lastElement:
		baseString += '"' + retTitle(index) + '" : "' + str(data.value) + '",\n'
	else:
		baseString += '"' + retTitle(index) + '" : "' + str(data.value) + '"\n'
	return baseString

def formatExtension(data, indentCount):
	baseString = ""
	for x in range(indentCount):
		baseString += "\t"
	baseString += '"' + str(data.value)  + '" : {\n'
	return baseString

def formatArray(index, data, indentCount, lastElement = False):
	baseString = ""
	for x in range(indentCount):
		baseString += "\t"
	if not lastElement:
		baseString += '"' + retTitle(index) + '" : ' + str(data.value) + ',\n'
	else:
		baseString += '"' + retTitle(index) + '" : ' + str(data.value) + '\n'
	return baseString

def retTitle(index):
	return str(sheet[str(chr(65+index))+'1'].value)

print(retTitle(0))
with open("data.json", 'w') as file:
	for rowCount, row in enumerate(sheet):
		if not first:
			file.write('{\n')
			file.write('\t"cards": {\n')
			first = True

		else:
			for index, cell in enumerate(row):
				if index == 0:
					string = formatExtension(cell, 2)
					file.write(string)
				elif index == 1 or index == 2 or index == 3:
					string = formatData(index, cell, 3)
					file.write(string)

				elif index == 4:
					string = formatExtension(cell, 3)
					file.write(string)

				elif index == 5 or index == 6:
					string = formatData(index, cell, 4)
					file.write(string)

				elif index == 7:
					string = formatData(index, cell, 4, True)
					file.write(string)
					file.write("\t\t\t},\n")

				elif index == 8:
					string = formatExtension(cell, 3)
					file.write(string)

				elif index == 9:
					string = formatExtension(cell, 4)
					file.write(string)

				elif index == 10:
					string = formatArray(index, cell, 5)
					file.write(string)

				elif index == 11:
					string = formatData(index, cell, 5, True)
					file.write(string)
					file.write("\t\t\t\t},\n")

				elif index == 12:
					string = formatExtension(cell, 4)
					file.write(string)

				elif index == 13:
					string = formatArray(index, cell, 5)
					file.write(string)

				elif index == 14:
					string = formatData(index, cell, 5, True)
					file.write(string)
					file.write("\t\t\t\t},\n")

				elif index == 15:
					string = formatExtension(cell, 4)
					file.write(string)

				elif index == 16:
					string = formatArray(index, cell, 5)
					file.write(string)

				elif index == 17:
					string = formatData(index, cell, 5, True)
					file.write(string)
					file.write("\t\t\t\t}\n")
					file.write("\t\t\t}\n")
					if rowCount < numberofCards:
						file.write("\t\t},\n")
					else:
						file.write("\t\t}\n")
			
		if rowCount >= numberofCards:
			break

	file.write("\t}\n")
	file.write("}")
