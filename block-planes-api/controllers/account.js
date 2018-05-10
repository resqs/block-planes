const db = require('../db');
const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const jwt = require('jsonwebtoken');
const webtoken = require('../controllers/webtoken');
var jwtDecode = require('jwt-decode');

const createAccount = (req, res) => {
  db.query('SELECT `username` FROM `users` WHERE `username` = ?', [req.body.newUsername], (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (!data.length) {
        db.query(`INSERT INTO users (full_name, username, password, profile_picture, total_points) 
                VALUES (?, ?, ?, ?, ?) `, [req.body.fullName, req.body.newUsername, req.body.newPassword, req.body.profilePicture, 0], (err, data) => {
            if (err) {
              res.send(err);
            } else {
              db.query('SELECT * FROM users WHERE id = ?', [data.insertId], (err, data) => {
                if (err) {
                  res.send(err);
                } else {
                        const user = {
                          id: data[0].id,
                          username: data[0].username,
                          fullName: data[0].full_name,
                          profilePicture: data[0].profile_picture,
                          totalPoints: data[0].total_points,
                          createdAt: data[0].created_at
                        };
                        jwt.sign({user: user}, process.env.JWT_SECRET, (err, token) => {
                          res.json({ user: user, token: token });
                        });
                    }
              })
            }
          });
      } else {
        res.send('exists');
      }
    }
  });
};

const signIn = (req, res) => {
  db.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, data) => {
    if (data.length) {
      bcrypt.compareAsync(req.params.password, data[0].password)
        .then(response => {
          if (response) {
            const user = {
              id: data[0].id,
              username: data[0].username,
              fullName: data[0].full_name,
              profilePicture: data[0].profile_picture,
              totalPoints: data[0].total_points,
              createdAt: data[0].created_at
            };
            jwt.sign({ user }, process.env.JWT_SECRET, (err, token) => {
              console.log(token);
              res.json({ user, token });
            });
          } else {
            res.send('wrong');
          }
        })
        .catch(err => {
          res.status(404).send('Request failed');
        });
    } else {
      res.send('wrong');
    }
  });
}

const signInToken = (req, res) => {
  var decoded = jwtDecode(req.query.token);
  res.send(decoded);
}

module.exports.createAccount = createAccount;
module.exports.signIn = signIn;
module.exports.signInToken = signInToken;