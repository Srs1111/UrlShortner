# URL Shortner


A simple and efficient URL Shortener backend built with -> Node.js, Express, and MongoDB using Mongoose.

# Features
 Shorten long URLs to custom short codes
- Redirect users from short URL to original URL
- Automatic expiration 
- MongoDB-based storage
- RESTful API design

# Tech Stack 
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv for environment variables

  url-shortener/
│
├── models/
│ └── urlModel.js
├── routes/
│ └── urlRoutes.js
├── controllers/
│ └── urlController.js
├── .env
├── app.js
├── package.json
└── README.md


# API Endpoints
Method	Endpoint	Description
POST	/api/shorten	Create a short URL
GET	/:shortCode	Redirect to original URL

# Run the App
node app.js
