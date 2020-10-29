var express = require('express');

function createRouter(db) {
  const router = express.Router();
  
  // define routes
 
  // GET if user data exists, not the contents
  router.get('/user/exists/:name', (req, res, next) => {
    db.query(
      'select exists(select 1 from user where name=?)',
      [req.params.name],
      (error, results) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });
  
  // GET all existing user data
  router.get('/user', (req, res) => {
    db.query(
      'select id, name, password, email, privilage from user',
      [],
      (error, results) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results);
        }
      }
    );
  });
  
  // GET existing user data
  router.get('/user/:id', (req, res, next) => {
    db.query(
      'select id, name, password, email, privilage from user where id=?',
      [req.params.id],
      (error, results) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });
  
  // GET existing user data
  router.get('/user/:name/:password', (req, res, next) => {
    db.query(
      "select id, name, password, email, privilage from user where name=? and password=?",
      [req.params.name, req.params.password],
      (error, results) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json(results[0]);
        }
      }
    );
  });
  
  // POST new user data
  router.post('/user', (req, res, next) => {
    db.query(
      'insert into user (name, password, email, privilage) values(?, ?, ?, ?)',
      [req.body.name, req.body.password, req.body.email, req.body.privilage],
      (error) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  // PUT updated data
  router.put('/user/:id', (req, res, next) => {
    db.query(
      'update user set name=?, password=?, email=? where id=?',
      [req.body.name, req.body.password, req.body.email, req.params.id],
      (error) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  // DELETE 
  router.delete('/user/:id', (req, res, next) => {
    db.query(
      'delete from user where id=?',
      [req.params.id],
      (error) => {
        if(error) {
          console.error(error);
          res.status(500).json({status: 'error'});
        } else {
          res.status(200).json({status: 'ok'});
        }
      }
    );
  });
  
  return router;
}

module.exports = createRouter;