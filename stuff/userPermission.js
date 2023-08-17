const {userPermission} = require('./databaseWork.js')

async function userHavePermisson(id, permission){
    let permissions = await userPermission(id)
    console.log(permissions)
    if(permissions.includes(permission)){
        return true
    } else {
        return false
    }
}

module.exports = {
    userHavePermisson
}