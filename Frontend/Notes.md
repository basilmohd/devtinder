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

Deployment
  - Signup on AWS , launch Ec2 instance and crete a new keyvalue pair. will get pem file
  - chmod 400 devTinder.pem
  - ssh -i "devTinder.pem" ubuntu@ec2-16-171-0-50.eu-north-1.compute.amazonaws.com
  - FrontEnd
    - install node and clone the project from github
    - npm i && npm run build
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist folder to root of nginx /var/www/html
    - sudo scp -r dist/* /var/www/html/ 
    - Enable port 80 on ec2 instance and allow all ips
    - check from public IP and test if its working
  
  - Backend
    - allowed ec2 instance public IP on mango server
    - npm i pm2 -g
    - pm2 start npm --name "devTinderBE" -- start
    - pm2 logs
    - pm2 list, pm2 flush <name> , 

    FrontEnd => http://16.171.0.50/
    Backend => http://16.171.0.50:3000/ => http://16.171.0.50/api

    - nginx config 
     - update nginx config to proxypass for /api
     - sudo /etc/nginx/sites-available/ nano default
      location /api/ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }
     - sudo systemctl restart nginx
