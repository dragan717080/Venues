import requests
from database_atlas import DatabaseAtlas
from utils import Utils
from dotenv import dotenv_values

API_KEY = dotenv_values(".env")['OPENTRIPMAP_API_KEY']
GEONAMES_USERNAME = dotenv_values(".env")['GEONAMES_USERNAME']
BASE_URL='http://api.opentripmap.com/0.1/en'

def search_populations():

    for i in range(0, 9000, 500):
        URL = f'https://documentation-resources.opendatasoft.com/api/records/1.0/search'
        params = {
            'dataset': 'geonames-all-cities-with-a-population-1000',
            'sort': 'population',
            'start': i,
            'rows': 500
        }
        response = requests.get(URL, params=params)

        if response.status_code == 200:
            data = response.json()
            for record in data['records']:
                record['fields']['digital_elevation_model'] = record['fields']['dem']
                record['fields']['coordinates'] = [Utils.format_coordinate(value) if i == 0 else Utils.format_coordinate(value, False) for i, value in enumerate(record['fields']['coordinates'])]
                record['fields'] = {k: v for k, v in record['fields'].items() if k not in ['feature_class', 'feature_code', 'modification_date', 'admin1_code', 'admin2_code', 'admin3_code', 'geoname_id', 'dem', 'cou_name_en']}
                DatabaseAtlas.insertOne('populations', record['fields'])

        else:
            print(f"Error occurred: {response.status_code}")
            break

if __name__ == "__main__":

    c = 'populations'
    print(DatabaseAtlas.lenAll('Population'))

