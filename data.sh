echo "Dataset generation begins!"

python3 utils/json2js_state.py
python3 utils/split_districts_geojson.py
python3 utils/json2js_districts.py

rm -r datasets/india/india_district/districts/json/

echo "Dataset generated!"