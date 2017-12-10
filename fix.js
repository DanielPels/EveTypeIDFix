var fs = require('fs');
var yaml = require('js-yaml');
var jsonToGo = require('./json-to-go');

var typeIDs = yaml.safeLoad(fs.readFileSync('./sde/fsd/typeIDs.yaml', 'utf8'));
var categoryIDs = yaml.safeLoad(fs.readFileSync('./sde/fsd/categoryIDs.yaml', 'utf8'));
var groupIDs = yaml.safeLoad(fs.readFileSync('./sde/fsd/groupIDs.yaml', 'utf8'));

var typeIDsArray = [];

for (var type in typeIDs) {
    if (typeIDs.hasOwnProperty(type)) {
        if (typeIDs[type].hasOwnProperty("name") && typeIDs[type].hasOwnProperty("groupID")) {
            if (typeIDs[type]["name"].hasOwnProperty("en")) {
                typeIDsArray.push({
                    typeID: Number(type),
                    name: typeIDs[type]["name"]["en"],
                    groupID: typeIDs[type]["groupID"]
                })
            }
        }
    }
}

var categoryIDsArray = [];

for (var category in categoryIDs) {
    if (categoryIDs.hasOwnProperty(category)) {
        var a = categoryIDs[category];
        if (categoryIDs[category].hasOwnProperty("name")) {
            if (categoryIDs[category]["name"].hasOwnProperty("en")) {
                categoryIDsArray.push({
                    categoryID: Number(category),
                    name: categoryIDs[category]["name"]["en"]
                })
            }
        }
    }
}

var groupIDsArray = [];

for (var group in groupIDs) {
    if (groupIDs.hasOwnProperty(group)) {
        if (groupIDs[group].hasOwnProperty("name") && groupIDs[group].hasOwnProperty("categoryID")) {
            if (groupIDs[group]["name"].hasOwnProperty("en")) {
                groupIDsArray.push({
                    groupID: Number(group),
                    name: groupIDs[group]["name"]["en"],
                    categoryID: groupIDs[group]["categoryID"]
                })
            }
        }
    }
}

if (!fs.existsSync('./fixed')){
    fs.mkdirSync(dir);
}

var typeIDsJSON = JSON.stringify(typeIDsArray);
fs.writeFile("./fixed/typeIDs.json", typeIDsJSON, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The typeIDsArray was saved!");
});
fs.writeFile("./fixed/typeIDs.go", jsonToGo(typeIDsJSON, "typeIDs").go, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The typeIDs was saved!");
});

var categoryIDsJSON = JSON.stringify(categoryIDsArray);
fs.writeFile("./fixed/categoryIDs.json", categoryIDsJSON, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The categoryIDs was saved!");
});
fs.writeFile("./fixed/categoryIDs.go", jsonToGo(categoryIDsJSON, "categoryIDs").go, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The categoryIDs was saved!");
});

var groupIDsJSON = JSON.stringify(groupIDsArray);
fs.writeFile("./fixed/groupIDs.json", groupIDsJSON, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The groupIDs was saved!");
});
fs.writeFile("./fixed/groupIDs.go", jsonToGo(groupIDsJSON, "groupIDs").go, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log("The groupIDs was saved!");
});