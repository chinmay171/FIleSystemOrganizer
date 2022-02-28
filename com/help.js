const fs = require('fs')
const path = require('path')
function helpfn(){
    console.log(`
    this is help and below are the functions and thier features :
                       1. tree -- to have a look of organised directory in terminal in tree format
                       2. organize -- to organize the given directory and copy paste its file to thier respective folder and then delete from initial directory
                       3. help -- to get to these documentation
    `)
}
module.exports = {
    helpKey : helpfn
}