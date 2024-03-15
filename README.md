# Chat Server and Client Application

## Instructions:

1. **Running the Server:**
   - Ensure you have Node.js installed on your machine.
   - Navigate to the `backend` directory.
   - Run the command `npm install` to install all dependencies.
   - Run the command `node index.js` to start the server.
   - By default, the server will listen on port 4000. You can specify a different port by setting the `PORT` environment variable, e.g., `PORT=3000 node index.js`.

2. **Running the Client:**
   - Make sure the server is already running.
   - Navigate to the `frontend` directory.
   - Run the command `npm install` to install all dependencies.
   - Run the command `npm start` to start the React application.
   - The client application will automatically open in your default web browser at `http://localhost:3000` (assuming you haven't changed the default React port).

## Application Architecture and Concurrency:

- **Server Side:**
  - The server is implemented in Node.js using the `http` and `socket.io` libraries.
  - It initializes an HTTP server to listen for incoming connections.
  - `socket.io` is used for real-time bidirectional event-based communication between the server and clients.
  - Concurrency is handled using asynchronous I/O provided by Node.js. Each client connection is handled within an event-driven model, allowing multiple clients to connect concurrently.
  - Messages received from clients are broadcasted to all connected clients.

- **Client Side:**
  - The client application is a simple React application.
  - It connects to the server using `socket.io-client`.
  - Messages sent by the user are emitted to the server, which broadcasts them to other clients.
  - Received messages from other clients are displayed in real-time on the user interface.

## Assumptions and Design Choices:

1. **Language Choice:**
   - Node.js was chosen as the language for both server and client due to its event-driven, non-blocking I/O model, which is well-suited for real-time applications like chat.

2. **Concurrency Handling:**
   - Asynchronous I/O provided by Node.js was used for concurrency handling on the server side to support multiple client connections concurrently.

3. **User Interface:**
   - A simple text-based user interface was chosen for the client application to focus on functionality rather than aesthetics.
   - Messages are displayed in a chat-like format, with the sender's name and timestamp.

4. **Error Handling:**
   - Basic error handling is implemented to handle socket errors on both the server and client sides.
   - If an error occurs, an alert message is shown to the user, and error messages are logged to the server console.

5. **Deployment:**
   - The server and client are assumed to be running on localhost for development purposes. For production deployment, appropriate measures such as securing the server, handling CORS, and deploying the client to a web server would be necessary.

6. **External Libraries:**
   - The application does not use any external libraries or frameworks for the chat logic, as per the requirement. However, it utilizes standard libraries for threading or asynchronous operations provided by Node.js.

7. **Code Structure:**
   - The code is organized into separate files for the server and client components, making it modular and easier to maintain.

## Additional Notes:

- This chat application serves as a basic implementation and can be extended further with additional features such as user authentication, private messaging, message persistence, and more.
