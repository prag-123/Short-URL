import json
import requests

HV_ID_DB_CHECK_BASE_URL = "https://ind-verify.hyperverge.co/api/centralDBCheck"

def dbCheck(payload):
    print(payload)
    # payload = json.dumps(payload)
    
    headers = {
        'appId': 'appid',
        'appKey': 'appkey',
        'transactionId': 'dev-test',
        'Content-Type': 'application/json'
    }
    
    response = requests.request("POST", HV_ID_DB_CHECK_BASE_URL, headers=headers, data=payload)
    data = json.loads(response.text)
    
    if response.ok:
        if data["result"]["summary"]["action"] == "pass":
            return True, data
        else:
            return False, data
    else:
        print(response.text)
        return False, data

payload = {"fileNumber": "UK20747XXXXXXXXXX", "dob": "XX-XX-1991", "idType": "passport"}
print(dbCheck(payload))