import json
f = open("Requirements\Requirements.json")
data = json.load(f)

print(data["NUS"]["1"]["Course Name"])

f.close()