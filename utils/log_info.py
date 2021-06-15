from os import stat
import pandas as pd
import json
import numpy as np

population_data = pd.read_csv('datasets/india/india_taluka/village_compiled_dataset.csv')
data = json.load(open('datasets/india/india_taluka/india_taluk.json', 'r'))

states = population_data['State Name'].to_numpy()
districts = population_data['District Name'].to_numpy()
talukas = population_data['Sub District Name'].to_numpy()

data_dict = {}
for state, district, taluka in zip(states, districts, talukas):
    if state in data_dict.keys():
        if district in data_dict[state].keys():
            if taluka in data_dict[state][district]:
                pass
            else:
                data_dict[state][district].append(str(taluka))
        else:
            data_dict[state][district] = [str(taluka)]
    else:
        data_dict[state] = {district: [str(taluka)]}

with open('csv_data.json', 'w') as file:
    json.dump(data_dict, file, indent=4)

data_dict = {}
for feature in data['features']:
    state = feature['properties']['NAME_1']
    district = feature['properties']['NAME_2']
    taluka = feature['properties']['NAME_3']
    if state in data_dict.keys():
        if district in data_dict[state].keys():
            data_dict[state][district].append(taluka)
        else:
            data_dict[state][district] = [taluka]
    else:
        data_dict[state] = {district: [taluka]}

with open('json_data.json', 'w') as file:
    json.dump(data_dict, file, indent=4, sort_keys=True)