var vcf = require("./config/vehconfig.json")
var pcf = require("./config/pedconfig.json")
var wcf = require("./config/weaponconfig.json")

async function DoesPlayerHasBlacklistWeapon(id) {
    for (const i in wcf) {
        const weapon = wcf[i]
        const hash = GetHashKey(weapon)
        const ped = GetPlayerPed(id)

        RemoveWeaponFromPed(ped, hash)
    }
}

async function DoesPlayerHasBlacklistPed(id) {
    const ped = GetPlayerPed(id)
    for (const key in pcf) {
        
        const plped = GetEntityModel(ped)
        const hash = GetHashKey(pcf[key])

        if (plped == hash) {
            emitNet("ChangePed", id)
        }
    }
}

async function DoesPlayerSitInBlacklistVehicle(id) {
    const ped = GetPlayerPed(id)
    for (const key in vcf) {
        const plvehicle = GetVehiclePedIsIn(ped, false)
        let plmodel = 0

        if (plvehicle != 0) {
            plmodel = GetEntityModel(plvehicle)
        }

        const blvehicle = GetHashKey(vcf[key])

        if (plmodel == blvehicle) {
            const Nid = NetworkGetNetworkIdFromEntity(plvehicle)
            emitNet("LeaveVehicle", id, Nid)
        }
    }
}

setTick(async () => {
    let players = getPlayers()
    for (const key in players) {
        await Wait(500)
        const id = players[key]

        DoesPlayerSitInBlacklistVehicle(id)
        DoesPlayerHasBlacklistPed(id)
        DoesPlayerHasBlacklistWeapon(id)
    }
})


RegisterCommand("getPlayers", () => {
    console.log(getPlayers())
}, false)