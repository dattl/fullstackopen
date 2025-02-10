sequenceDiagram
    participant browser
    participant server

    Note right of browser: On save button clicked
    browser->>browser: Append the input text
    activate browser
    deactivate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP 201, Result
    deactivate server

    Note right of browser: Save note to server
