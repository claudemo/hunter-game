## Usage
Modify ngrol yaml fiel first 

export REACT_APP_API_SERVICE_URL=http://localhost:5000

## test locally
### probably necessary
npm install --save pigeon-maps
### be starter
cd twtr-game
cd be 
python app.py
### fe starter
cd twtr-game
cd fe
npm install
PORT=3001 npm start

### ngrok inspector
https://dashboard.ngrok.com/ac_2iFjJF9gyvOZrdzg55UaAnVuvMF/observability/traffic-inspector

ngrok http http://localhost:3001
ngrok http http://localhost:5000
### ngrok starter 
ngrok start --all



### socketio version thing
use python 3.11.4

### ngrok 
- problem: the ngrok frontend where 3000 is mapped to connot connect to localhost backend
` ngrok config check`


### ----trying to fix
manual fetch is not working/updating as wished




### gpt starter
### main

	1.	Setup the Flask application to serve React and handle WebSockets.
	2.	Configure the React application to communicate with Flask using WebSockets.
	3.	Use ngrok to expose the local Flask server to the internet for real-time updates from any location.
### stucture
/my_project
|-- /backend
    |-- app.py
|-- /frontend
    |-- /build
        |-- index.html
        |-- /static
            |-- /js
            |-- /css

Flask Configuration:
	•	Static Directory: Flask needs to be configured to serve the static files from the React build directory.
  -  In your Flask application (app.py), you should set the static_folder and static_url_path parameters of the Flask app to point to the React build directory.

### Customize defult center
//boston
      <Map defaultCenter={[42.361145, -71.057083]} defaultZoom={15} height={400} width={600}>

 //beijing
      <Map defaultCenter={[39.90556, 116.39139]} defaultZoom={15} height={400} width={600}>

The real-time location update in a web application using React, Flask, and WebSocket (through Flask-SocketIO) works as follows:

### Process Overview

1. **Client Sends Location**: A client (e.g., a mobile phone or web browser) obtains its geographic location through GPS or a similar service. This location data typically includes latitude and longitude coordinates.

2. **Location Data Transmission**: The client sends this location data to the server via a WebSocket connection. This is done using an event, for example, 'postLocation', where the client emits this event to the server along with the location data.

3. **Server Receives and Broadcasts Location**: The Flask server, equipped with Flask-SocketIO, listens for these 'postLocation' events. When such an event is received, the server can perform any necessary processing or storage operations. Subsequently, the server broadcasts this location data to all other connected clients using another event, for example, 'locationUpdate'. This ensures all clients receive the updated location data in real-time.

4. **Clients Update their UI**: Each client, upon receiving the 'locationUpdate' event through their WebSocket connection, updates their user interface. In the context of a map application using Pigeon Maps, this typically involves updating the map to display a marker or some visual representation at the new location.

### Technical Details

- **WebSocket**: This protocol provides a full-duplex communication channel over a single, long-lived connection, allowing the server and client to send messages at any time. This is ideal for real-time applications because it avoids the overhead and latency associated with repeatedly opening new HTTP connections.

- **Flask-SocketIO**: This is a Flask extension that makes it easy to manage WebSocket connections in a Python application. It handles the complexities of maintaining these connections across different clients and provides a simple interface for emitting and listening to custom events.

- **React Application**: On the client side, the React application maintains a state that represents the markers or locations on the map. When it receives a new location via a WebSocket event, it updates this state, triggering a re-render of the map with the new location data.

- **Pigeon Maps**: This is used within the React application to render the map and markers. It updates in response to state changes, reflecting new locations as they are received.

This setup ensures that location updates are transmitted and received almost instantaneously, allowing for dynamic and interactive real-time applications. This is particularly useful for applications such as live tracking systems, real-time asset tracking, or any scenario where users need to see updates quickly and reliably as they occur.

### steps
Flask Backend:
- Define Flask app.
- @app.route('/update-location', methods=['POST'])
  - Parse request for location (latitude, longitude) and speed.
  - Store location and speed in a global dictionary keyed by client ID.
- @app.route('/locations', methods=['GET'])
  - Return the current locations and speeds of all clients.

React Frontend:
- Install Pigeon Maps.
- MapComponent:
  - Use Pigeon Map to display the map.
  - Fetch locations and speeds from Flask backend periodically (useEffect with setInterval).
  - Update map markers for each location.
  - Display SpeedTableComponent on top right of the map.
- SpeedTableComponent:
  - Accepts locations and speeds as props.
  - Renders a table showing client ID, speed, and location.

Ngrok:
- Run Ngrok to expose Flask server.
- Update React app to use the Ngrok URL for backend requests.

Simulate Real-Time Updates:
- For simulation, periodically send POST requests to `/update-location` with random locations and speeds.
- React app fetches updates from `/locations` and refreshes the map and speed table.