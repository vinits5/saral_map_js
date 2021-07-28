import json
import csv


##################### State #####################

csv_states_list = []
geojson_states_list = []
csvreader = csv.reader(open('./sort_data/geojson_data_modified.csv', 'r'))

# Read name of states in original geojson and modified names.
for row in csvreader:
    geojson_states_list.append(row[0])
    csv_states_list.append(row[3])

# Find set of states.
geojson_state_names = list(set(geojson_states_list))

# Key: Name of state in original geojson and Value: Update state name.
states_names_dict = {}
for state in geojson_state_names:
    state_added = False
    for idx, val in  enumerate(geojson_states_list):
        if state == val and csv_states_list[idx] != 'NA':
            states_names_dict[state] = csv_states_list[idx]
            state_added = True
            break
    if not state_added:
        states_names_dict[state] = state

# Update the geojson file.
file = open('datasets/india/india_state/india_state.json', 'r')
output_dir = 'datasets/india/india_state/'

data = json.load(file)

new_json = {}
new_json['type'] = data['type']
new_json['crs'] = data['crs']
new_json['features'] = []

for feature in data['features']:
    feature['properties']['NAME_1'] = states_names_dict[feature['properties']['NAME_1']]
    new_json['features'].append(feature)

new_file = open(output_dir+'india_state_v2.json', 'w')
json.dump(new_json, new_file, indent=2)
new_file.close()


##################### District #####################

file = open('datasets/india/india_district/india_district.json', 'r')
output_dir = 'datasets/india/india_district/'

csvreader = csv.reader(open('./sort_data/geojson_data_modified.csv', 'r'))

# Read name of districts in original geojson and modified district names.
csv_districts_list = []
geojson_districts_list = []
for row in csvreader:
    csv_districts_list.append(row[4])
    geojson_districts_list.append(row[1])

data = json.load(file)

new_json = {}
new_json['type'] = data['type']
new_json['crs'] = data['crs']
new_json['features'] = []

for feature in data['features']:
    for idx, (state, district) in enumerate(zip(geojson_states_list, geojson_districts_list)):
        if feature['properties']['NAME_1'] == state and feature['properties']['NAME_2'] == district:
            if csv_districts_list[idx] == 'NA':
                pass
            else:    
                feature['properties']['NAME_2'] = csv_districts_list[idx]
            break

    feature['properties']['NAME_1'] = states_names_dict[feature['properties']['NAME_1']]
    new_json['features'].append(feature)

new_file = open(output_dir+'india_district_v2.json', 'w')
json.dump(new_json, new_file, indent=2)
new_file.close()


##################### Talukas #####################

file = open('datasets/india/india_taluka/india_taluka_v1.json', 'r')
output_dir = 'datasets/india/india_taluka/'

csvreader = csv.reader(open('./sort_data/geojson_data_modified.csv', 'r'))

# Read name of districts in original geojson and modified district names.
csv_talukas_list = []
geojson_talukas_list = []
for row in csvreader:
    csv_talukas_list.append(row[5])
    geojson_talukas_list.append(row[2])

data = json.load(file)

new_json = {}
new_json['type'] = data['type']
new_json['crs'] = data['crs']
new_json['features'] = []

for feature in data['features']:
    for idx, (state, district, taluka) in enumerate(zip(geojson_states_list, geojson_districts_list, geojson_talukas_list)):
        if feature['properties']['NAME_1'] == state and feature['properties']['NAME_2'] == district and feature['properties']['NAME_3'] == taluka:
            if csv_districts_list[idx] == 'NA':
                pass
            else:    
                feature['properties']['NAME_2'] = csv_districts_list[idx]
            if csv_talukas_list[idx] == 'NA':
                pass
            else:
                feature['properties']['NAME_3'] = csv_talukas_list[idx]
            break

    feature['properties']['NAME_1'] = states_names_dict[feature['properties']['NAME_1']]
    new_json['features'].append(feature)

new_file = open(output_dir+'india_taluka_v2.json', 'w')
json.dump(new_json, new_file, indent=2)
new_file.close()