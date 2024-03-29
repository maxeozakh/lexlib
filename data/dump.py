# generated by GPT

import json
import requests

json_file_path = 'episodes.json'


def load_json_data(filepath):
    with open(filepath, 'r') as file:
        return json.load(file)


def fetch_video_chapters(video_id):
    url = f"https://yt.lemnoslife.com/videos?part=chapters&id={video_id}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        # Assuming the structure of the response is consistent with the example provided
        chapters = data['items'][0]['chapters']['chapters']
        simplified_chapters = [{'title': chap['title'],
                                'time': chap['time']} for chap in chapters]
        return simplified_chapters
    else:
        # throw error
        print('Error fetching data')
        return None


def main():
    counter = 0
    json_data = load_json_data(json_file_path)
    results = []

    for item in json_data:
        api_response = fetch_video_chapters(item['videoId'])
        result = {
            'title': item['title'],
            'episode': item['episodeNumber'],
            'videoId': item['videoId'],
            'response': api_response
        }
        counter += 1
        print(json.dumps(result, indent=4))
        print(f'Processed {counter} items')
        results.append(result)

    # You can now use the results list for further processing, or print it out
    with open('output_chapters.json', 'w') as output_file:
        json.dump(results, output_file, indent=4)


if __name__ == "__main__":
    main()