# Web Tech: Node.js Browser Page to Client-Server Architecture

This repository contains the source code accompanying the tutorial on transitioning a standalone client-side browser application into a dynamic client-server system using Node.js.

---

##  Repository Structure

```text
├── my_bookings_browser_app/    # Standalone browser-side version
│   ├── bookings.json
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── index.html
│   ├── no.jpg
│   └── yes.jpg
│
└── my_booking_server/          # Full client-server version
    ├── bookings.json
    ├── favicon-32x32.png
    ├── favicon.ico
    ├── index.html
    ├── no.jpg
    ├── server.js
    ├── server_02.js
    └── yes.jpg
````

-----

##  File & Directory Descriptions

### 1\. Standalone Browser App (`my_bookings_browser_app/`)

This folder represents the initial phase of the tutorial: a frontend application running directly in the browser.

*   **`index.html`**  
    The main user interface for the booking application. Contains the HTML structure, inline styling (CSS), and client-side JavaScript responsible for rendering booking slots, handling user clicks/selections, and managing local state.
*   **`bookings.json`**  
    The sample JSON dataset containing initial seat/slot booking records (e.g., booked vs. available slots) used to populate the interface.
*   **`yes.jpg` & `no.jpg`**  
    Visual status indicators representing booked/occupied status and available status within the booking grid.
*   **`favicon.ico` & `favicon-32x32.png`**  
    Browser tab icons for the application.

-----

### 2\. Client-Server Application (`my_booking_server/`)

This folder contains the transformed architecture where Node.js manages HTTP requests, serves static files, and maintains synchronized state across clients.

*   **`server.js`**  
    The initial Node.js HTTP server. Sets up the basic `http.createServer` routing logic to serve static assets (`index.html`, images, icons, and JSON data) over HTTP rather than opening local file paths directly.
*   **`server_02.js`**  
    The enhanced server implementation. Adds logic for handling dynamic client requests, parsing URL parameters/GET queries, updating the in-memory or persisted booking state, and sending back updated JSON responses to keep multiple connected browsers synchronized.
*   **`index.html`**  
    The updated frontend interface modified to communicate with the Node.js backend via asynchronous requests (`fetch`), sending user actions to the server and updating the view dynamically based on responses.
*   **`bookings.json`**  
    The central server-side data store holding the current availability and booking state.
*   **`yes.jpg` & `no.jpg`**  
    Static asset images served over HTTP by the Node server.
*   **`favicon.ico` & `favicon-32x32.png`**  
    Favicon assets served with appropriate MIME types by the Node server.

-----

##  Getting Started

### Prerequisites

*   Node.js installed on your machine.

### Running the Node.js Server

1.  Open your terminal and navigate to the server folder:

    ```bash
    cd my_booking_server
    ```

2.  Start the base server:

    ```bash
    node server.js
    ```

    *Or start the dynamic interactive server:*

    ```bash
    node server_02.js
    ```

3.  Open your web browser and navigate to:

    ```text
    http://localhost:8080   # (or the port specified in your server script)
    ```

4.  Open multiple browser tabs/windows to test real-time state synchronization across clients.

<!-- end list -->

```


```