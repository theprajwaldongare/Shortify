## Shortify
Shortify is a fast and secure URL shortener for your looooooong URLs!

[Go to Shortify](https://shortifyme.onrender.com)

Shortify generates a 5-character random string for your long URL, validates it for uniqueness to prevent collisions, and safely stores it in a MongoDB database. Each character is generated using Base62 encoding, meaning it has 62 possibilities:
* **0-9** maps to numbers `0-9`
* **10-35** maps to lowercase letters `a-z`
* **36-61** maps to uppercase letters `A-Z`

By generating 5 characters, this custom algorithm creates a total of **91,61,32,832** unique shortened URLs!
