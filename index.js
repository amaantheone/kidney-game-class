const express = require("express");
const app = express();
const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.use(express.json());

app.get("/", function (req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys += 1;
        }
    }
    const numberOfUnHealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json ({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnHealthyKidneys
    })
})

app.post("/", function (req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({})
})

app.put("/", function (req, res) {
    let count = 0;
    let healthyKidneys;
    for (let i = 0; i< users[0].kidneys.length; i++ ){
        if (users[0].kidneys[i].healthy) {
            count += 1;
        }
    }
    if (count == users[0].kidneys.length) {
        healthyKidneys = true;
    }
    if (!healthyKidneys) {
        for (let i = 0; i< users[0].kidneys.length; i++ ){
            users[0].kidneys[i].healthy = true;
        }
        res.json({msg: "Done!"});
    }
    else {
        res.status(411).json({
            msg: "Your kidney is already healthy!"
        })
    }
})

app.delete("/", function (req, res) {
    let atleastOneUnhealthykidney = false;
    for (let i = 0; i< users[0].kidneys.length; i++ ){
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthykidney = true;
        }
    }
    if (atleastOneUnhealthykidney) {
        const newKidneys = [];
        for (let i = 0; i< users[0].kidneys.length; i++ ){
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})
    }
    else {
        res.status(411).json({
            msg: "You have no bad kidneys:)"
        })
    }
})

app.listen(3000);