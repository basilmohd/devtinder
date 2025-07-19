authRouter
- POST /login
- POST /signup
- POST /logout

ProfileRouter
- GET /profile/view
- PATCH /profile/update
- PATCH /profile/resetPassword -- get currrent and new password. compare if current password is correct then udpate the new password in db after hashing

ConnectionRouter
- POST /request/send/:status/:userId
- POST /request/received/:status/:requestId

UserRouter
- GET user/connections
- GET user/requests/received
- GET user/feed