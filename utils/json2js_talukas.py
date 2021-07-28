from json2js import json2js
import os

input_dir = 'datasets/india/india_taluka/json'
output_dir = 'datasets/india/india_taluka/js'
if not os.path.exists(output_dir): os.makedirs(output_dir)
varname = 'indianTalukas'

for state in os.listdir(input_dir):
    if not os.path.exists(os.path.join(output_dir, state)): 
        os.makedirs(os.path.join(output_dir, state))
    for district in os.listdir(os.path.join(input_dir, state)):
        district = district[:-5]

        input_file = os.path.join(input_dir, state, district+'.json')
        output_file = os.path.join(output_dir, state, district+'.js')
        json2js(input_file, output_file, varname)
