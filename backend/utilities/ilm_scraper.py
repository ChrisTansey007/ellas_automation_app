from flask import jsonify
import requests
from bs4 import BeautifulSoup
import pandas as pd
import logging

url = 'https://flyilm.com/arrivals-and-departures'


def extract_table_from_webpage(url, table_number):
    """
    Extracts a table from a webpage given its URL and the index of the table.

    Args:
    url (str): URL of the webpage to scrape.
    table_number (int): Index of the table to extract.

    Returns:
    DataFrame or None: DataFrame if table is successfully extracted, None otherwise.
    """
    try:
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException as e:
        logging.error(f"Error fetching data from URL: {e}")
        return None

    try:
        soup = BeautifulSoup(response.content, 'html.parser')
        tables = soup.find_all('table')

        if table_number >= len(tables):
            raise IndexError("Table index out of range")

        table_data = process_table_rows(tables[table_number])
        return pd.DataFrame(table_data)
    except Exception as e:
        logging.error(f"Error processing table data: {e}")
        return None


def process_table_rows(table):
    """
    Processes the rows of a table and extracts text from each cell.

    Args:
    table (bs4.element.Tag): The table to process.

    Returns:
    list: A list of lists, where each sublist represents a row in the table.
    """
    rows = table.find_all('tr')
    max_columns = 0
    table_data = []

    for row in rows:
        columns = row.find_all(['td', 'th'])
        columns_text = [column.text.strip() for column in columns]
        max_columns = max(max_columns, len(columns_text))
        table_data.append(columns_text)

    return normalize_row_length(table_data, max_columns)


def normalize_row_length(data, column_count):
    """
    Normalizes the length of each row in the data to have the same number of columns.

    Args:
    data (list of list): The table data.
    column_count (int): The desired number of columns per row.

    Returns:
    list: The normalized data.
    """
    for row in data:
        row.extend([None] * (column_count - len(row)))
    return data


def ilm_scraper():
    print("Starting ilm_scraper function.")

    arrivals_table_number = 0   # Set the index for the arrivals table
    departures_table_number = 1  # Set the index for the departures table

    print(f"Arrivals table index: {arrivals_table_number}")
    print(f"Departures table index: {departures_table_number}")

    # Extract arrivals
    print("Extracting arrivals data.")
    arrivals_df = extract_table_from_webpage(url, arrivals_table_number)
    print(f"Arrivals DataFrame: {arrivals_df}")

    if arrivals_df is not None:
        print("Converting arrivals DataFrame to dictionary.")
        arrivals = arrivals_df.to_dict(orient='records')
        print(f"Arrivals data: {arrivals}")
    else:
        print("No arrivals data extracted. Setting arrivals to empty list.")
        arrivals = []  # or handle errors as needed

    # Extract departures
    print("Extracting departures data.")
    departures_df = extract_table_from_webpage(url, departures_table_number)
    print(f"Departures DataFrame: {departures_df}")

    if departures_df is not None:
        print("Converting departures DataFrame to dictionary.")
        departures = departures_df.to_dict(orient='records')
        print(f"Departures data: {departures}")
    else:
        print("No departures data extracted. Setting departures to empty list.")
        departures = []  # or handle errors as needed

    sample_data = {
        "arrivals": arrivals,
        "departures": departures
    }

    print(f"Final sample data: {sample_data}")

    return jsonify(sample_data)


# def ilm_scraper():
#     sample_data = {
#         "arrivals": [
#             {"flightNumber": "AA123", "origin": "New York",
#                 "scheduledTime": "14:00", "actualTime": "13:50", "status": "Arrived"},
#             # ... more sample arrivals
#         ],
#         "departures": [
#             {"flightNumber": "AA456", "destination": "Los Angeles",
#                 "scheduledTime": "15:00", "actualTime": "15:10", "status": "Departed"},
#             # ... more sample departures
#         ]
#     }
#     return jsonify(sample_data)
