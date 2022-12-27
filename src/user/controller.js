const pool = require("../../db");
const queries = require("./queries");
const crypto = require("crypto");

const getHash = (str) =>
  crypto
    .createHash("md5")
    .update(str.toUpperCase().replace(/[^A-Z,^0-9]/g, ""))
    .digest("hex");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const getUserById = (req, res) => {
  const person_key = req.params.person_key;
  pool.query(queries.getUserById, [person_key], (error, result) => {
    if (error) throw error;
    res.status(200).json(result.rows);
  });
};

const addUser = (req, res) => {
  const {
    first_name,
    middle_name,
    last_name,
    sex,
    birth_date,
    personal_email,
    home_phone,
    street,
    city,
    state,
    zip,
  } = req.body;

  const person_key = getHash(personal_email + home_phone);
  const address_key = getHash(street + city + state + zip);

  const insertUserAddress = () => {
    pool.query(
      queries.addUserAddress,
      [person_key, address_key],
      (error, results) => {
        try {
          if (error) {
            throw error;
          }
          res.status(200).send("User Created Successfully");
        } catch (e) {}
      }
    );
  };

  const insertAddress = () => {
    pool.query(
      queries.addAddress,
      [street, city, state, zip, address_key],
      (error, results) => {
        try {
          if (error) {
            throw error;
          }
          insertUserAddress();
        } catch (e) {
          res.status(200).send(e);
          insertUserAddress();
        }
      }
    );
  };

  const insertUser = () => {
    pool.query(
      queries.addUser,
      [
        first_name,
        middle_name,
        last_name,
        sex,
        birth_date,
        personal_email,
        home_phone,
        person_key,
      ],
      (error, results) => {
        try {
          if (error) {
            throw error;
          }
          insertAddress();
        } catch (e) {
          insertAddress();
        }
      }
    );
  };

  //Check if email exists.
  pool.query(queries.checkEmailExists, [personal_email], (error, results) => {
    try {
      if (results.rows.length) {
        res.send("Email already exists");
      } else {
        insertUser();
      }
    } catch (e) {}
  });
};

const deleteUserById = (req, res) => {
  const person_key = req.params.person_key;

  const removeAddress = () => {
    pool.query(queries.deleteAdress, (error, result) => {
      try {
        if (error) throw error;
        //      res.status(200).json(result.rows);
        res.send(`Person Key ${person_key} successuflly deleted.`);
      } catch (e) {
        res.send(`Failed to delete ${person_key} in address_tbl.`);
      }
    });
  };

  const removeUser = () => {
    pool.query(queries.deleteUser, [person_key], (error, result) => {
      try {
        if (error) throw error;
        removeAddress();
      } catch (e) {
        res.send(e);
        res.send(`Failed to delete ${person_key} in users_tbl.`);
      }
    });
  };

  const removeUserAddress = () => {
    pool.query(queries.deleteUserAdress, [person_key], (error, result) => {
      try {
        if (error) throw error;
        removeUser();
        //     res.status(200).json(result.rows);
      } catch (e) {
        res.send(`Failed to delete ${person_key} in address_user_tbl.`);
      }
    });
  };

  //***************************************************************************
  //***************************************************************************
  pool.query(queries.getUserById, [person_key], (error, result) => {
    if (!result.rows.length) {
      res.send(`Person Key ${person_key} not found.`);
    } else {
      removeUserAddress();
    }
  });
  //***************************************************************************
  //***************************************************************************
};
const updateUser = (req, res) => {
  const person_key = req.params.id;
  const {
    first_name,
    middle_name,
    last_name,
    sex,
    birth_date,
    personal_email,
    home_phone,
    street,
    city,
    state,
    zip,
  } = req.body;
};
module.exports = {getUsers, getUserById, addUser, deleteUserById, updateUser};
