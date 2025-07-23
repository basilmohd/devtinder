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
- GET user/connections -- get all the connections for a user
- GET user/requests/received -- connection request received by a user
- GET user/feed -- all users who are not yet a connection nor any pending request nor self 