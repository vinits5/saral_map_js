import json
import os

def split(input_file, output_dir):
    if not os.path.exists(output_dir): os.makedirs(output_dir)
    
    try:
        file = open(input_file, 'r')
    except:
        raise Exception('Input file path not found')
    
    data = json.load(file)

    districts = [feature['properties']['DISTRICT'] for feature in data['features']]
    districts = list(set(districts))
    
    new_json = {}
    new_json['type'] = data['type']
    for district in districts:
        new_json['features'] = []
        for feature in data['features']:
            if feature['properties']['DISTRICT'] == district:
                new_json['features'].append(feature)
        
        new_file = open(os.path.join(output_dir, district+'.json'), 'w')
        json.dump(new_json, new_file)


input_file = 'datasets/india/india_villages/json/Bihar.json'
output_dir = 'datasets/india/india_villages/json/Bihar/'
split(input_file, output_dir)