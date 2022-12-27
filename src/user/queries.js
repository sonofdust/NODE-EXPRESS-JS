const getUsers = `SELECT 
                        u.person_key,    
                        u.first_name, 
                        u.middle_name, 
                        u.last_name, 
                        u.sex, 
                        u.birth_date, 
                        u.personal_email,
                        u.home_phone,
                        a.street,
                        a.city,
                        a.state,
                        a.zip
                    FROM users_tbl u JOIN users_address_tbl ua on u.person_key = ua.person_key 
                    JOIN address_tbl a ON a.address_key = ua.address_key`;

const getUserById = `SELECT 
                    u.person_key,    
                    u.first_name, 
                    u.middle_name, 
                    u.last_name, 
                    u.sex, 
                    u.birth_date, 
                    u.personal_email,
                    u.home_phone,
                    a.street,
                    a.city,
                    a.state,
                    a.zip
                FROM users_tbl u JOIN users_address_tbl ua on u.person_key = ua.person_key 
                JOIN address_tbl a ON a.address_key = ua.address_key
                WHERE u.person_key = $1`;

const checkEmailExists = `SELECT u FROM users_tbl u WHERE u.personal_email = $1`;
const addUser = `INSERT INTO users_tbl (first_name,
				                 	    middle_name,
					                    last_name,
					                    sex,
					                    birth_date,
					                    date_entered,
					                    personal_email,
					                    home_phone,
					                    person_key)
                                        VALUES
                                       (
                                        $1,
                                        $2,
                                        $3,
                                        $4,
	                                    $5,
                                        current_timestamp,
                                        $6,
                                        $7,
	                                    $8
                                       )`;

const addAddress = `INSERT INTO address_tbl (street,
				                 	         city,
					                         state,
					                         zip,
					                         address_key)
                                             VALUES
                                             (
                                             $1,
                                             $2,
                                             $3,
                                             $4,
	                                         $5)`;

const addUserAddress = `INSERT INTO users_address_tbl (person_key, address_key) VALUES ($1,$2)`;

const deleteUser = `
DELETE FROM users_tbl WHERE person_key = $1;`;

const deleteUserAdress = `DELETE FROM users_address_tbl WHERE person_key = $1;`;

const deleteAdress = `DELETE FROM address_tbl WHERE address_key IN (
SELECT a.address_key FROM address_tbl a LEFT JOIN users_address_tbl ua ON a.address_key = ua.address_key 
WHERE ua.address_key ISNULL)`;

const updateUser = `UPDATE users_tbl SET first_name = $1, middle_name = $2, last_name = $3 WHERE person_key = $4`;
const updateUserAddress = `UPDATE users_address_tbl SET address_key = $1 WHERE person_key = $2`;

module.exports = {
  getUsers,
  getUserById,
  checkEmailExists,
  addUser,
  addAddress,
  addUserAddress,
  deleteUserAdress,
  deleteUser,
  deleteAdress,
  updateUser,
  updateUserAddress,
};
