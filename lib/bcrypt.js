// import package
const bcrypt = require('bcrypt');

exports.generatePassword = (password) => {
    try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);

        return {
            "passwordStatus": true,
            hash
        }
    }
    catch (err) {
        return {
            "passwordStatus": false
        }
    }
}

exports.comparePassword = (password, hashPassword) => {
    try {
        let comparePwd = bcrypt.compareSync(password, hashPassword);

        return {
            "compareStatus": comparePwd
        }
    }
    catch (err) {
        return {
            "compareStatus": false
        }
    }
}
