import os
import json
import random

# Save messages for retrieval later on
def get_recent_messages():

    # Define the file name and learn prompt instructions
    file_name = "stored_data.json"
    learn_instruction = {
        "role": "system",
        "content": "You are a Spanish teacher and your name is Rachel, the user is called Seth. Keep responses under 30 words. ",
    }

    # Initialize messages
    messages = []

    # Add a random element
    x = random.uniform(0, 1)
    if x < 0.2:
        learn_instruction["content"] = (
            learn_instruction["content"]
            + " Your response will include some dry humour. "
        )
    elif x < 0.5:
        learn_instruction["content"] = (
            learn_instruction["content"]
            + " Your response will include an interesting new fact about Spain. "
        )
    else:
        learn_instruction["content"] = (
            learn_instruction["content"]
            + " Your response will recommend another word to learn. "
        )

    # Append instruction to message
    messages.append(learn_instruction)

    # Get last messages
    try:
        with open(file_name) as user_file:
            data = json.load(user_file)

            # Append last 5 rows of data
            if data:
                if len(data) < 5:
                    for item in data:
                        messages.append(item)
                else:
                    for item in data[-5:]:
                        messages.append(item)
    except Exception as e:
        print(e)
        pass

    # Return
    return messages

# Save messages for retrieval later on
def store_messages(request_message, response_message):
    
    # Define the file name
    file_name = "stored_data.json"

    # Get recent messages
    messages = get_recent_messages()[1:]

    # Add messges to data
    user_message = {"role": "user", "content": request_message}
    assistant_message = {"role": "assistant", "content": response_message}
    messages.append(user_message)
    messages.append(assistant_message)

    # Save the updated file
    with open(file_name, "w") as f:
        json.dump(messages, f)

# Reset messages
def reset_messages():
    # Override current file with nothing
    open("stored_data.json", "w")
