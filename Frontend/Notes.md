# Sequences 
    - Create vite app
    - install tailwind and configure in vite.config.js
    - install daisy ui - component design library
    - install daisy UI and add navbar
    - create new component for Navbar.jsx
    - add react router dom
    - Crete BrowserRouter > Routes > Route /Body >RouteChildren
    - Create Outlet in body component
    - Create a footer
    - Create Login Page
    - Install Axios
    - CORS install in nodejs, with credentials=true
    - pass axios = {with credentials:true} for api calls
    - Install Redux toolkit & react-redux
    - Configure Store => provider => createSlice => add reducer to store
    - Add redux devtools in chrome
    - Login and see if data coming properly in store [useDispatch hook to dispatch and action to update state]    - 
    - Navbar should udpates as soom as user logs in [useSelector hook to read the state and the slice]
    - Refactor code to add constant file 

    - update body component to load the page calling userprofile service on initial load. if token is present then api should be success and feed page will load in page reload.
    - Logout feature implementation
    - user feed page creation with user card
    - Edit profile page creation with side by side card display

    - New Page -to show all connections
    - New Page - to show all requests
    - Implement reviewRequest api to accept or reject requests
    - update state to remove request once accepted/rejected

    - Implement Send/ignore connection request
    - Implement Signup page
    - E2E testing

Body
  - Navbar
  - Route=/ => feed
  - Route=/login => login