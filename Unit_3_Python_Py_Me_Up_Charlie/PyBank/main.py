import os
import csv

csvpath = os.path.join('..', 'PyBank_Resources', 'budget_data.csv')

with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    csv_header = next(csvreader)

    months=0 # Counts the total months in the dataset
    total=0 # Finds the total profit throught the recorded duration 
    delta=0 # Tracs the difrence between the profit in one row from the next
    previous_row = 0 # Takes the value of the profit from the previous row

    greatest_increase=0
    greatest_increase_date=""
    greatest_decrease=0
    greatest_decrease_date=""

    for row in csvreader:
    	months += 1
    	total += float(row[1])
    	if months > 1:
    		delta = delta+float(row[1]) - previous_row
    
    	 
    	previous_row = float(row[1])
    	if float(row[1]) > greatest_increase:
    		greatest_increase = float(row[1])
    		greatest_increase_date = row[0]
    		continue

    	if float(row[1]) < greatest_decrease:
    		greatest_decrease = float(row[1])
    		greatest_decrease_date = row[0]
    		continue

# Print the values and add them to a txt file

print("Financial Analysis")
print("----------------------")
print(f"Total Months: {months}")
print(f"Total: ${round(total)}")
print(f"Average Change: ${round(delta/(months-1))}")
print(f"Greatest Increase in Profits: {greatest_increase_date} (${round(greatest_increase)})")
print(f"Greatest Decrease in Profits: {greatest_decrease_date} (${round(greatest_decrease)})")
print("----------------------")

open("PyBank.txt", 'w').close()
f = open("PyBank.txt", "a")

print("Financial Analysis", file=f)
print("----------------------", file =f)
print(f"Total Months: {months}", file =f)
print(f"Total: ${round(total)}", file =f)
print(f"Average Change: ${round(delta/(months-1))}", file =f)
print(f"Greatest Increase in Profits: {greatest_increase_date} (${round(greatest_increase)})", file =f)
print(f"Greatest Decrease in Profits: {greatest_decrease_date} (${round(greatest_decrease)})", file =f)
print("----------------------" , file =f)


  






