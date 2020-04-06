const users = [];

const addUser = ( {id, name, room} ) => {

    if(name){
        name = name.trim().toLowerCase();
    }
    
    if(room){
        room = room.trim().toLowerCase();
    }

    const existingUser = users.find( (user) => user.room == room && user.name === name);

    if(existingUser) {
        return { error: 'User is already logged in'}
    }

    const user = { id, name, room}

    console.log("id: ", id);

    users.push(user);
    console.log("users: ", users);

    return { user }
} 

const removeUser = (email) => {
    const index = users.findIndex( (user) => user.email === email);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }

}

const getUser = (name) => users.find( (user) => user.name === name)

const getUserInRoom = (room) => users.filter( (user) => user.room === room)

module.exports = {addUser, removeUser, getUser, getUserInRoom}