const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://sandra_joseph:junghoseok@ac-dayqjc3-shard-00-00.gtlcxqh.mongodb.net:27017,ac-dayqjc3-shard-00-01.gtlcxqh.mongodb.net:27017,ac-dayqjc3-shard-00-02.gtlcxqh.mongodb.net:27017/evdb?ssl=true&replicaSet=atlas-13t3ac-shard-0&authSource=admin&appName=Cluster0")
    .then(() => {
        console.log("MongoDB Connected");

    })

    .catch((err) => {
        console.log(err);
    });

const Ev = mongoose.model("Evs", new mongoose.Schema(
    {
        bookingId: String,
        ownerName: String,
        email: String,
        phone: String,
        vehicleregistrationNumber: String,
        vehicleBrand: String,
        vehicleModel: String,
        batteryCapacity: String,
        connecterType: String,
        chargingDate: String,
        timeSlot: String,
        estimatedTimeUnit: String,
        chargingBayNumber: String
    }
))

app.post("/add-vehiclebooking", async (request, response) => {
    await Ev.create(request.body)
    response.json({ "status": "success" })
})

    app.post("/view-allbooking", async (request, response) => {
    const data = await Ev.find();
    response.json(data);
});


app.listen(3000, () => {
    console.log("Server Started on Port 3000");
})