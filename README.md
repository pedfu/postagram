# POSTAGRAM
A instagram clone. 
Technologies used:
- React
- Firebase
- Tailwind

Some functionalities:
- Login/Signin
- Add post
- Like/Comment post
- Follow/Unfollow
- Change profile picture
- Profile page
- Timeline
- Some users recommendations to follow
- Search users


### architecture
- src
    - components
    - constants -> constantes ex. LOGIN -> /login  user -> /user/:username ...
    - context -> tipo redux -> quando fizermos uma coneccao com firebase, ao inves de passar firebase para cada component, mesmo que ele nao va usar, a gente usa o context (onde o firebase fica em um provider e eh consumido por consumers dentro dos components).
    - helpers
    - hooks
    - pages
    - lib (firebase is gointo to line in here) -> where we connect to firebase
    - services (firebase functions in here) -> for example check if username already exists, so we would call a function in services
    - styles (tailwind's folder (app/tailwind))

### Credits
A huge thanks to freecodeacademy and Karl Hadwen.
