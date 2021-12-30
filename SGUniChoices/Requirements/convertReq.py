import pandas as pd
import json

requirements = pd.read_excel('Requirements/USReq.xlsx',header=0)
requirements_json = dict()
School_wide_requirements = dict()

i=0
while i<len(requirements):
    if requirements.loc[i,"School"] not in requirements_json:
        requirements_json[requirements.loc[i,"School"]] = dict()
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])] = dict()
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["Course Name"]=requirements.loc[i,"Course Name"]
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["Link"]=requirements.loc[i,"Link"]
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["Poly"]=requirements.loc[i,"Polytechnic or equivalent institutions"].split(", ")
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["ALevel"]=requirements.loc[i,"Singapore-Cambridge GCE ‘A’ Level"].split(", ")
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["IB"]=requirements.loc[i,"International Baccalaureate(IB) Diploma"].split(", ")
    requirements_json[requirements.loc[i,"School"]][str(requirements.loc[i,"Course No."])]["NUSH"]=requirements.loc[i,"NUS High School Diploma"].split(", ")
    i+=1

with open("Requirements/USReq.json","w") as f:
    json.dump(requirements_json,f)