Wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))
var cf = require("./config/config.json")

var currActivePlayers = []

var offlinePlayers = []

onNet("PushPlayer", async (source) => {
    PushPlayer(source)
})

on("playerDropped", (reason) => {
    offlinePlayers.push({id: source})
});

function PushPlayer(source) {
    currActivePlayers.push({id: source, name: GetPlayerName(source)})
}

function GetPlayers() {
    return currActivePlayers
}

async function DoesPlayerSitInBlacklistVehicle(id, ped) {
    for (const key in cf) {
        const plvehicle = GetVehiclePedIsIn(ped, false)
        let plmodel = 0

        if (plvehicle != 0) {
            plmodel = GetEntityModel(plvehicle)
        }

        const blvehicle = GetHashKey(cf[key])
       
        if (plmodel == blvehicle) {
            console.log(plvehicle + " || "+ blvehicle)
            const Nid = NetworkGetNetworkIdFromEntity(plvehicle)
            emitNet("LeaveVehicle", id, Nid)
        }
    }
}

setTick(async () => {
    await Wait(500)
    let players = GetPlayers()
    for (const key in players) {
        await Wait(500)
        const id = players[key]["id"]
        const ped = GetPlayerPed(id)
        DoesPlayerSitInBlacklistVehicle(id, ped)

        for (const key2 in offlinePlayers) {
            if (players[key][id] == offlinePlayers[key2][id]) {
                currActivePlayers.splice(key, 1)
                offlinePlayers.splice(key2, 1)
            }
        }
    }
})