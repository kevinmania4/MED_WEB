
import json
with open('Modelo05JSON') as json_data:
    content = json_data.read()
    data = json.loads(content)

sintomas = []
enfermedades=[]
for entry in data:
    sintomas.append(entry['sintomas'])
    enfermedades.append(entry['enfermedad'])

# for i in sintomas:
#     print(i)
#print(sintomas)

