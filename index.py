from fastapi import FastAPI
app = FastAPI()
import openai
import json
openai.api_key = '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'
messages = [ 
{"role": "system", "content": 'Respond ONLY in with tests in a json format like {"questionNumber": {"question": question, "answerChoices": {"A": {"answerChoice": answerChoice, "correctAnswer": Bool}, "B": {"answerChoice": answerChoice, "correctAnswer": Bool}, "C": {"answerChoice": answerChoice, "correctAnswer": Bool}, "D": {"answerChoice": answerChoice, "correctAnswer": Bool}}}}. Return ONLY json, no other text.' }
]


@app.get("/getTest")
def getTest(type):
    
    message = f"make a {type} test"
    messages.append({"role": "user", "content": message})
    chat = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)
        
    test = json.loads(chat.choices[0].message.content)
    messages.append({"role": "assistant", "content": test})

    return test

