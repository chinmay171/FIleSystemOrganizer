const fs = require('fs')
const path = require('path')
let inputarr = process.argv.slice(2)
let command = inputarr[0]

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
        "csv",
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb", ],
    photos : ["jpg", "jpeg" , "png"],
  };

switch(command){
    case 'tree' :
        treefn()
        break
    case 'organize' :
        organizefn(inputarr[1])
        break
    case 'help' :
        helpfn()
        break
    default :
    console.log("enter valid command please or atleast consider help...")     
}

function treefn(){
    console.log("this is tree")
}

function organizefn(dirpath){
    
    let destPath 

    if(dirpath == undefined){
        console.log("enter valid path please")
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
function helpfn(){
    console.log(`
    this is help and below are the functions and thier features :
                       1. tree -- to have a look of organised directory in terminal in tree format
                       2. organize -- to organize the given directory and copy paste its file to thier respective folder and then delete from initial directory
                       3. help -- to get to these documentation
    `)
}

