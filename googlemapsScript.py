rimport requests
import mysql.connector
#pip install requests
import csv 
import datetime

toHome = {"origin" : "450+Skokie+Blvd+Northbrook+IL+60062", "destination" : "451+W+Huron+St+Chicago+IL+60654", "departure_time" : "now", "traffic_model" : "best_guess", "key" :  "AIzaSyBCDGmA67XOi9dUt6zoacGRHZrmw9pE8tg"}
toWork = {"origin" : "451+W+Huron+St+Chicago+IL+60654", "destination" : "450+Skokie+Blvd+Northbrook+IL+60062",  "departure_time" : "now", "traffic_model" : "best_guess", "key" :  "AIzaSyBCDGmA67XOi9dUt6zoacGRHZrmw9pE8tg"}

r = requests.get('https://maps.googleapis.com/maps/api/directions/json', params=toWork)

jsonData = r.json()
print("To Work: ")
timeToWork = jsonData["routes"][0]["legs"][0]["duration_in_traffic"]["text"]
print(timeToWork)


r2 = requests.get('https://maps.googleapis.com/maps/api/directions/json', params=toHome)

jsonData2 = r2.json()

print("To Home:")
timeToHome = jsonData2["routes"][0]["legs"][0]["duration_in_traffic"]["text"]
print (timeToHome)

f = open("/home/pi/Documents/googleMaps/googleMapsTest.csv", "a")

now = datetime.datetime.now()
weekday = now.weekday()

weekWords = ""
if weekday == 0:
	weekWords = "Monday"
elif weekday == 1:
	weekWords = "Tuesday"
elif weekday == 2:
	weekWords = "Wednesday"
elif weekday == 3:
	weekWords = "Thursday"
elif weekday == 4:
	weekWords = "Friday"
elif weekday == 5:
	weekWords = "Saturday"
else:
	weekWords = "Sunday"

date = now.strftime("%Y-%m-%d")
time = now.strftime("%H:%M")

row = [date, time, weekWords, timeToHome, timeToWork]

writer = csv.writer(f)
#writer.writerow(("Date", "Time", "Weekday", "To Home", "To Work"))
writer.writerow( (row[0],  row[1], row[2], row[3], row[4]) )

conn = mysql.connector.connect(user='root', password = 'raspberry', host='localhost', database = 'googleMaps')

cursor = conn.cursor()

addRow = ("INSERT INTO mapsTable(`Date`, `Time`, `Weekday`, `toHome`, `toWork`) VALUES (%s, %s, %s, %s, %s)")

values = (row[0], row[1], row[2], row[3], row[4])

cursor.execute(addRow, values)

conn.commit()

cursor.close()
conn.close()

