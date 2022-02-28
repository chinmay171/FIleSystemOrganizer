const fs = require('fs')
const path = require('path')
function organizefn(dirpath){
    
    let destPath 

    if(dirpath == undefined){
        destPath = process.cwd();
        return;
    }

    let doesExist = fs.existsSync(dirpath)
    if(doesExist){
        destPath = path.join(dirpath , "organize_file")
        if(fs.existsSync(destPath)){
            console.log("path already exists please create a new one or continue working on this")
        }
        else{
            fs.mkdirSync(destPath)
            console.log("new directory has been made please check it out...")
        }
    }
    else{
        console.log("path  does not exists")
    }
    organize_helper(dirpath , destPath)
}

function organize_helper(dirpath , destpath){
    let childNames  = fs.readdirSync(dirpath)

    for(let i = 0; i<childNames.length ; ++i){
        let childaddress = path.join(dirpath , childNames[i])
        let isFile = fs.lstatSync(childaddress).isFile()

        if(isFile){
            let category = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to " + category)
            sendFile(childaddress , destpath ,category)

        }
    }
}

function getCategory(names){
    let ext = path.extname(names)
    ext = ext.slice(1)

    for(let type in types){
        let ctypeArr = types[type];

        for(let   i=0; i< ctypeArr.length ; ++i){
            if(ext == ctypeArr[i]){
                return type;
            }
        }
    }
    return "other"

}

function sendFile(srcFilePath , destFilePath , category){
    let catpath = path.join(destFilePath , category)
    if(fs.existsSync(catpath) == false){
        fs.mkdirSync(catpath)
    }
    let  fileName  = path.basename(catpath)
    let dest = path.join(catpath , fileName)
    fs.copyFileSync(srcFilePath , dest)
    fs.unlinkSync(srcFilePath)

}
module.exports = {
    organizeKey : organizefn
}