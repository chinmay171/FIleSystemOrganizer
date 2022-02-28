#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
let treeObj = require('./com/tree')
let helpObj = require('./com/help')
let organizeObj = require('./com/organize')
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
        treeObj.treeKey(inputarr[1])
        break
    case 'organize' :
        organizeObj.organizeKey(inputarr[1])
        break
    case 'help' :
        helpObj.helpKey()
        break
    default :
    console.log("enter valid command please or atleast consider help...")     
}
