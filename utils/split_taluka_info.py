import os
import json
from json2js import json2js

file = open('datasets/india/india_taluka/india_taluka_v2.json', 'r')
data = json.load(file)

# NAME_0: country
# NAME_1: state
# NAME_2: district
# NAME_3: Taluka

states = [feature['properties']['NAME_1'] for feature in data['features']]
districts = [feature['properties']['NAME_2'] for feature in data['features']]

new_json = {}
new_json['type'] = data['type']
new_json['crs'] = data['crs']

output_dir = 'datasets/india/india_taluka/json'
output_dir_js = 'datasets/india/india_taluka/js'
if not os.path.exists(output_dir): os.makedirs(output_dir)

for state in list(set(states)):
    if not os.path.exists(os.path.join(output_dir, state)): os.mkdir(os.path.join(output_dir, state))

    state_districts = [district_i for district_i, state_i in zip(districts, states) if state_i == state]

    for district in list(set(state_districts)):
        new_json['features'] = []
        for feature in data['features']:
            if feature['properties']['NAME_1'] == state and feature['properties']['NAME_2'] == district:
                new_json['features'].append(feature)
    
        new_file = open(os.path.join(output_dir, state, district + '.json'), 'w')
        json.dump(new_json, new_file)