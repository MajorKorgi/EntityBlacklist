on('onClientResourceStart', async () => {
    let source = GetPlayerServerId(GetPlayerIndex())
    emitNet("PushPlayer", (source))
})

onNet("LeaveVehicle", async (Nid) => {
    let ped = GetPlayerPed(-1)
    let vehicle = NetworkGetEntityFromNetworkId(Nid)
    TaskLeaveVehicle(ped, vehicle, 0)
    SetVehicleDoorsLockedForAllPlayers(vehicle, true)
})

onNet("ChangePed", async (wcf) => {
    let ped = GetPlayerPed(-1)
    let model = "a_m_y_skater_01"
    RequestModel(GetHashKey(model))
    
    while (!HasModelLoaded(GetHashKey(model))) {
        await Wait(1)
    }

    SetPlayerModel(PlayerId(), model)
})