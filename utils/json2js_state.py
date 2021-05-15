from json2js import json2js

input_file = 'datasets/india/india_state/india_state.json'
output_file = 'datasets/india/india_state/india_state.js'
varname = 'indianStates'
json2js(input_file=input_file, output_file=output_file, varname=varname)