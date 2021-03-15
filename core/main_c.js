on('onClientResourceStart', async () => {
    let source = GetPlayerServerId(GetPlayerIndex())
    emitNet("PushPlayer", (source))
})

onNet("LeaveVehicle", async (Nid) => {
    console.log("somethin should happen")
    let ped = GetPlayerPed(-1)
    let vehicle = NetworkGetEntityFromNetworkId(Nid)
    TaskLeaveVehicle(ped, vehicle, 0)
    SetVehicleDoorsLockedForAllPlayers(vehicle, true)
})