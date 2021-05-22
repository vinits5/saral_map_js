echo "Dataset generation begins!"

python3 utils/json2js_state.py

python3 utils/split_india2states.py
python3 utils/json2js_districts.py

python3 utils/split_state2districts.py
python3 utils/json2js_villages.py

rm -r datasets/india/india_district/districts/json/
rm -r datasets/india/india_villages/json/

echo "Dataset generated!"