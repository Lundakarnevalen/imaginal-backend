module.exports = (app, log, adminToken, viewerToken) => {
  /**
    * @swagger
    * definitions:
    *   Login:
    *     required:
    *       - user
    *       - password
    *     properties:
    *       user:
    *         type: string
    *         example: "nille"
    *       password:
    *         type: string
    *         example: "123456"
    *   Accesslevel:
    *     properties:
    *       access_level:
    *         type: string
    *         example: "admin"
    *       logintoken:
    *         description: "Hardcoded token for admin or viewer"
    *         example: "XwPp9xazJ0ku5CZn"
    *         type: string
    * /api/click/login:
    *   post:
    *     description: Validates username and pw and says accesslevel
    *     summary: Validate username and password
    *     tags: [Login]
    *     parameters:
    *       - name: Loginparameters
    *         description: Username and password
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Login'
    *     responses:
    *       200:
    *         description: Accesslevel of user
    *         schema:
    *           $ref: '#/definitions/Accesslevel'
    *       401:
    *         description: Login not successfull
    */
  app.post('/api/click/login', function (req, res) {
    const credentials = req.body
    const [user, pw] = [credentials.user, credentials.password]

    if (user === 'admin' && pw === (process.env.ADMIN_PW || 'nilleiscute')) {
      log(req, 'Login', `${user} successfully logged in`)
      return res.status(200).json({
        access_level: 'admin',
        logintoken: adminToken
      })
    } else if (user === 'admin') {
      log(req, 'Login', `${user} didnt log in, wrong password`)
      return res.status(401).json({
        message: 'Not successful login'
      })
    }
    // if(user === 'viewer' && pw === (process.env.VIEWER_PW || 'nilleiswoaw')){
    //   log(req, 'Login', `${user} successfully logged in`)
    //   return res.status(200).json({
    //     access_level: 'viewer',
    //     logintoken: viewerToken,
    //   });
    // }
    log(req, 'Login', `${user} successfully logged in`)
    return res.status(200).json({
      access_level: 'clicker',
      logintoken: viewerToken
    })
  })
}
