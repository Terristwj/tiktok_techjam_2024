#!/usr/bin/env python3
# The above shebang (#!) operator tells Unix-like environments
# to run this file as a python3 script

import os
from flask import Flask, request, jsonify
from flask_cors import CORS

from baseline_recc_model import get_recommendation_videos

app = Flask(__name__)
CORS(app)

# Get User Recommendation
@app.route("/api/recommendation/<string:personId>", methods=['GET'])
def get_recommendation(personId):
    # example_personIDs = ["a2_9r", "a3536363773", "mybeautifulfantasy"]
    videos = get_recommendation_videos(personId)
    data = {
        'personId': personId,
        'recommendations': videos
    }
    print(f"\n\nPassing data:\n\n{data}\n\n")
    return jsonify(data)

# Check health
@app.route("/api/health", methods=['GET'])
def check_health():
    print("\n\nFlask health: OKAY\n\n")
    return jsonify({
        'health': "OKAY",
    })

if __name__ == '__main__':
    print("")
    print("Running flask microservice at: " + os.path.basename(__file__))
    print("")
    app.run(host='0.0.0.0', port=5001, debug=True)