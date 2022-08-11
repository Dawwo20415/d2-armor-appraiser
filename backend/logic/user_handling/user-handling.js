
var user_array = [];

function addUser(user) {
    user_array.push(user);
}

function removeUser(user) {
    var index = user_array.indexOf(user);
    if (index > -1) {
        user_array.splice(index,1);
    }
}

function isUserLogged(user) {
    const index = user_array.indexOf(user);
    if (index > -1) {
        return true;
    } else {
        return false;
    }
}

function getUser(membership_id) {
    for (let i = 0; i < user_array.length; i++) {
        if (membership_id == user_array[i].membership.Id) {
            return user_array[i];
        }
    }
}

module.exports = {
    addUser,
    removeUser,
    isUserLogged,
    getUser
}