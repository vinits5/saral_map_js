import json
import os

file = open('datasets/india/india_district/india_district_v2.json', 'r')

output_dir = 'datasets/india/india_district/districts/json/'
if not os.path.exists(output_dir): os.makedirs(output_dir)

data = json.load(file)

states = [feature['properties']['NAME_1'] for feature in data['features']]
states = list(set(states))

new_json = {}
new_json['type'] = data['type']
new_json['crs'] = data['crs']

for state in states:
    new_json['features'] = []
    for feature in data['features']:
        if feature['properties']['NAME_1'] == state:
            new_json['features'].append(feature)
    
    new_file = open(output_dir+state+'.json', 'w')
    json.dump(new_json, new_file)
    new_file.close()