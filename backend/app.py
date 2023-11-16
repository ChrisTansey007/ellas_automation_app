# app.py (Flask application)

from flask import Flask, jsonify
from flask_cors import CORS
from utilities.ilm_scraper import ilm_scraper

app = Flask(__name__)
CORS(app)


@app.route('/scrape')
def scrape_route():
    print("Scrape endpoint hit")
    try:
        # Assuming ilm_scraper returns a Flask Response object
        response = ilm_scraper()
        # Extract the data from the Response object
        if response.is_json:
            data = response.get_json()
        else:
            # Handle non-JSON responses or convert them to a JSON serializable format
            data = {"error": "Scraped data is not in JSON format"}
    except Exception as e:
        print("Error during scraping:", e)
        data = {"error": str(e)}
    return jsonify(data)


if __name__ == '__main__':
    print("Starting Flask server for scraping service...")
    app.run(debug=True)
