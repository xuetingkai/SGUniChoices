import pandas as pd

university = pd.read_excel('ExcelofUnis/SUSS.xlsx',header=0,index_col=0)

text = open("ExcelofUnis/texts/SUSS","w",encoding="utf-8")

code = text.name.replace("ExcelofUnis/texts/","")

text.write("        <div class=\"University\">\n")
text.write("          <div class=\"UniName\">\n")
text.write("            Singapore University of Social Sciences\n")
text.write("            <div><button id=\"" + code + "\" onclick=\"ViewCourses(this.id)\">View/Hide Courses</button></div>\n")
text.write("           </div>\n")
text.write("          <div class=\"UniCourses\" id=\""+ code.lower() +"\" style=\"display: none;\">\n")
text.write("            <div class=\"noselection\">Please select a discipline to begin.</div>\n")

counter = 1
for course in university.index:
    text.write("            <input class=\"courseCB\" id=\""+code+"Course"+str(counter)+"\" type=\"checkbox\" style=\"pointer-events:none\" onclick=\"SelectCourse(this.id)\">\n")
    text.write("            <div class=\"course")
    for discipline in university.columns:
        if university[discipline][course]:
            text.write(" "+discipline)
    text.write("\" id=\""+code.lower()+"course"+str(counter)+"\" onclick=\""+code+"Course"+str(counter)+".click()\">\n")
    text.write("              <span>"+course+"</span>\n")
    text.write("            </div>\n")
    counter += 1
text.write("         </div>\n")
text.write("        </div>")
text.close()
