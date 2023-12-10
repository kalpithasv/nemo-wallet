import streamlit as st
import cv2
import face_recognition
import sqlite3
from PIL import Image
import hashlib
import webbrowser

# Initialize SQLite database
conn = sqlite3.connect("faces7_main.db")
cursor = conn.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS faces (encoding TEXT, address TEXT)")
conn.commit()

def open_url(url):
    webbrowser.open_new_tab(url)

# Streamlit UI for user registration
def register_user():
    st.title("User Registration")
    
    # OpenCV capture for face registration
    cap = cv2.VideoCapture(0)
    st.warning("Please make sure your face is well-lit and centered.")
    
    # Create a placeholder for the camera feed
    camera_placeholder = st.empty()

    capture_button = st.button("Capture Face")
    while capture_button:
        ret, frame = cap.read()

        try:
            if ret:
                # Convert OpenCV BGR image to PIL RGB image
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                # Use face_recognition to find face locations and encodings
                face_locations = face_recognition.face_locations(frame_rgb)
                face_encodings = face_recognition.face_encodings(frame_rgb, face_locations)

                if face_encodings:
                    # Take the first face encoding
                    encoding = face_encodings[0]

                    # Convert encoding to a string for storage in SQLite
                    encoding_str = ",".join(map(str, encoding))

                    # Check if the face is similar to any existing face in the database
                    cursor.execute("SELECT * FROM faces")
                    results = cursor.fetchall()

                    similarity_threshold = 0.6  # Adjust this threshold based on your requirements

                    is_duplicate = False
                    for result in results:
                        stored_encoding = list(map(float, result[0].split(',')))

                        # Compare the detected face encoding with stored encoding
                        match = face_recognition.compare_faces([stored_encoding], encoding, tolerance=similarity_threshold)[0]

                        if match:
                            is_duplicate = True
                            break

                    if is_duplicate:
                        st.warning("User already registered!")
                    else:
                        # Generate an address for the user (you can use any logic to generate an address)
                        address = f"user_{hash(encoding_str)}"

                        # Insert into SQLite database
                        cursor.execute("INSERT INTO faces (encoding, address) VALUES (?, ?)", (encoding_str, address))
                        conn.commit()

                        st.success(f"User registered successfully with address: {address}")

                        # Display the captured image
                        st.image(frame_rgb, channels="RGB", caption="Captured Face")

                        break
                else:
                    st.warning("No face detected. Please try again.")
            else:
                st.warning("Unable to capture face. Please try again.")

            # Update the camera feed placeholder
            camera_placeholder.image(frame_rgb, channels="RGB")

            # Update the capture button to generate a new key
            capture_button_login = st.button("Capture Face")

        except Exception as e:
            break

    # Release the camera
    cap.release()


# Streamlit UI for face recognition and login
# Streamlit UI for face recognition and login
def recognize_and_login():
    st.title("Face Recognition and Login")

    # OpenCV capture for face recognition
    cap = cv2.VideoCapture(0)
    st.warning("Please make sure your face is well-lit and centered.")
    
    # Create a placeholder for the camera feed
    camera_placeholder = st.empty()

    recognize_button = st.button("Recognize and Login")
    while recognize_button:
        ret, frame = cap.read()

        try:
            if ret:
                # Convert OpenCV BGR image to PIL RGB image
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

                # Use face_recognition to find face locations and encodings
                face_locations = face_recognition.face_locations(frame_rgb)
                face_encodings = face_recognition.face_encodings(frame_rgb, face_locations)

                if face_encodings:
                    # Convert encoding to a string for comparison with stored encodings
                    detected_encoding = face_encodings[0]
                    detected_encoding_str = ",".join(map(str, detected_encoding))

                    # Query the database for stored encodings and addresses
                    cursor.execute("SELECT * FROM faces")
                    results = cursor.fetchall()

                    similarity_threshold = 0.6  # Adjust this threshold based on your requirements

                    is_recognized = False
                    for result in results:
                        stored_encoding = list(map(float, result[0].split(',')))
                        stored_address = result[1]

                        # Compare the detected face encoding with stored encoding
                        match = face_recognition.compare_faces([stored_encoding], detected_encoding, tolerance=similarity_threshold)[0]

                        if match:
                            st.success(f"Face recognized for user with address: {stored_address}")
                            is_recognized = True
                            break

                    if not is_recognized:
                        st.warning("Face not recognized!")

                else:
                    st.warning("No face detected. Please try again.")

                # Update the camera feed placeholder
                camera_placeholder.image(frame_rgb, channels="RGB")

            else:
                st.warning("Unable to capture face. Please try again.")

            # Update the recognize button to generate a new key
            recognize_button = st.button("Recognize and Login")

        except Exception as e:
            break

    # Release the camera
    cap.release()

# Streamlit main app
def main():
    st.sidebar.title("Face Recognition App")
    page = st.sidebar.radio("Select a page", ["Register User", "Recognize and Login"])
    if st.sidebar.button("Open URL"):
        open_url("http://localhost:3000/")

    if page == "Register User":
        register_user()
    elif page == "Recognize and Login":
        recognize_and_login()

if __name__ == "__main__":
    main()
