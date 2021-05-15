import os

def json2js(input_file, output_file, varname):
    print('Input: ', input_file)

    if input_file[-4:] == 'json':
        print('Output: ', output_file)
    else:
        raise Exception('Output path not defined')

    try:
        file = open(input_file, 'r')
        data = file.read()
        file.close()
    except:
        raise Exception('Input file doesn\'t exists!')

    start = 'var ' + varname + ' = ['
    end = '];'
    data = start + data + end

    try:
        file = open(output_file, 'w')
        file.write(data)
        file.close()
    except:
        raise Exception('Output file has issues!')