from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = "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"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get("message", "")
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "deepseek/deepseek-r1:free",
                "messages": [{"role":"user","content": user_message}]
            }
        )
        resp.raise_for_status()
        bot_response = resp.json()["choices"][0]["message"]["content"]
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"response": f"Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
