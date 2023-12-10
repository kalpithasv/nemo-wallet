import cv2
import json
import uuid
import hashlib
import numpy as np
import sqlite3
import cv2_cache as cc
from time import sleep

# Load the pre-trained face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Open a connection to the camera (camera index 0 usually refers to the default camera)
cap = cv2.VideoCapture(0)

# Initialize random_address outside the loop
random_address = str(uuid.uuid4())

# Flag to check if an image has already been recognized
image_recognized = False

# SQLite database setup
conn = sqlite3.connect('face_recognition.db')
cursor = conn.cursor()

# Create a table to store face data if it doesn't exist
cursor.execute('''
    CREATE TABLE IF NOT EXISTS face_data (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT,
        image_hash TEXT
    )
''')
conn.commit()

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to grayscale for face detection
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect faces in the frame
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)

    # Use a flag to check if a face has been detected in the current frame in cache
    face_detected = False

    # Loop over detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

        # Set the flag to True if a face is detected in cache
        if(cc._() == True):
            face_detected = True
        else:
            face_detected = False
    
        # Perform face recognition logic here

    # Generate a random address and hash only when a face is detected, and an image hasn't been recognized yet
    if face_detected and not image_recognized:
        # Convert the image to a hash using hashlib
        image_array = np.array(frame)  # Convert image to NumPy array
        image_data = image_array.tobytes()  # Convert the array to bytes
        image_hash = hashlib.sha256(image_data).hexdigest()

        # Insert data into the SQLite database
        cursor.execute('''
            INSERT INTO face_data (address, image_hash)
            VALUES (?, ?)
        ''', (random_address, image_hash))
        #clearing cache and commiting to database
        conn.commit()

        # Print the information
        print(f"Address: {random_address}, Image Hash: {image_hash}")

        # Set the flag to True to indicate that the image has been recognized
        image_recognized = True

    # Display the resulting frame
    cv2.imshow('Face Recognition', frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('n'):
        cc.___()
        break
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()

# Close the SQLite connection when done
conn.close()
