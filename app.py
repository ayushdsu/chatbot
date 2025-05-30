from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_URL = "https://api-inference.huggingface.co/models/bigscience/bloomz-560m"
API_TOKEN = "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"  # Replace with your actual token

headers = {
    "Authorization": f"Bearer {API_TOKEN}"
}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    print("Status Code:", response.status_code)
    print("Raw response:", response.text)
    response.raise_for_status()
    return response.json()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get("message", "")

    payload = {
        "inputs": message,
        "options": {"wait_for_model": True}
    }

    try:
        result = query(payload)
        print("Parsed result:", result)

        if isinstance(result, list) and "generated_text" in result[0]:
            return jsonify({"response": result[0]["generated_text"]})
        else:
            return jsonify({"response": "Model did not return expected output."})
    except requests.exceptions.HTTPError as http_err:
        print("HTTP error:", http_err)
        return jsonify({"response": f"HTTP error: {http_err}"}), 500
    except Exception as e:
        print("Error:", e)
        return jsonify({"response": f"Internal server error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
