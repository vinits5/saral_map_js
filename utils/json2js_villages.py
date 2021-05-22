import os
from json2js import json2js

input_dir = 'datasets/india/india_villages/json/Bihar/'
output_dir = 'datasets/india/india_villages/js/Bihar/'
if not os.path.exists(output_dir): os.makedirs(output_dir)

input_files = os.listdir(input_dir)
output_files = [input_file.split('.')[0]+'.js' for input_file in input_files]
output_files = [os.path.join(output_dir, x) for x in output_files]
input_files = [os.path.join(input_dir, x) for x in input_files]
varname = 'indianVillages'

for input_file, output_file in zip(input_files, output_files):
    json2js(input_file, output_file, varname)