
// client side redered app: react (create-react-app)
    // database -> Firebase
    // react-loading-skeleton
    // tailwind -> styles

// architecture
    // src
        // components
        // constants -> constantes ex. LOGIN -> /login  user -> /user/:username ...
        // context -> tipo redux -> quando fizermos uma coneccao com firebase, ao inves de passar firebase para cada component, mesmo que ele nao va usar, a gente usa o context (onde o firebase fica em um provider e eh consumido por consumers dentro dos components).
        // helpers
        // hooks
        // pages
        // lib (firebase is gointo to line in here) -> where we connect to firebase
        // services (firebase functions in here) -> for example check if username already exists, so we would call a function in services
        // styles (tailwind's folder (app/tailwind))


// firebase rules to add at the finish
    rules_version = '2';
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
            allow read;
            allow write: if request.auth.uid != null;
        }
    }

// tailwind configuration to package.json
    "scripts": {
    "build:css": "postcss src/styles/tailwind.css -o src/styles/app.css",
    "watch:css": "postcss src/styles/tailwind.css -o src/styles/app.css --watch",
    "react-scripts:start": "sleep 5 && react-scripts start",
    "start": "run-p watch:css react-scripts:start",
    "build": "run-s build:css react-scripts:build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },

    // what you need
  "devDependencies": {
    "autoprefixer": "^10.4.8",
    "npm-run-all": "^4.1.5",
    "postcss-cli": "^10.0.0",
    "prop-types": "^15.8.1",
    "tailwindcss": "^3.1.7"
  }