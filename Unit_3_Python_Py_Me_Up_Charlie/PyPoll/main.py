import os
import csv

csvpath = os.path.join('..', 'PyPoll_Resources', 'election_data.csv')

with open(csvpath, newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    
    csv_header = next(csvreader)


    total=0 # Counts the total months in the dataset
    column_2=[]

    for row in csvreader:
    	total += 1
    	column_2.append(row[2])
    	

    candidates = list(dict.fromkeys(column_2))
    

    votes = []
    for candidate in candidates:
    	tally=0
    	for row in column_2:
    		if row == candidate:
    			tally += 1
    	votes.append(tally)

    for x in range(0, len(votes)-1):
    	if votes[x] == max(votes):
    		winnr = candidates[x]





print("Election Results")
print("----------------------")
print(f"Total Votes: {total}")
print("----------------------")
i=-1
for candidate in candidates:
	i += 1
	print(f"{candidate} {round(100*votes[i]/total)}% ({votes[i]})")
print("----------------------")
print(f"Winner: {winnr}")

open("PyPool.txt", 'w').close()
f = open("PyPool.txt", "a")


print("Election Results", file=f)
print("----------------------", file=f)
print(f"Total Votes: {total}", file=f)
print("----------------------", file=f)
i=-1
for candidate in candidates:
	i += 1
	print(f"{candidate} {round(100*votes[i]/total)}% ({votes[i]})", file=f)
print("----------------------", file=f)
print(f"Winner: {winnr}", file=f)






