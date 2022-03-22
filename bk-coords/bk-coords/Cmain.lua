local editing = false
local Showing = false

RegisterCommand('open', function()
    Showing = true
end)

RegisterCommand('close', function()
    SendNUIMessage({
        action = "HideCoords",
    })
    Showing = false
    editing = false
end)
RegisterCommand('move', function ()
    if Showing then
        SetNuiFocus(true, true)
        editing = true
    else 
        Notification('You cant move the coords if they are not showing.')
    end
end)

RegisterNUICallback("close", function()
    SendNUIMessage({
        action = "HideCoords",
    })
    SetNuiFocus(false,false)
    
end)

Citizen.CreateThread(function()
    while true do 
        Citizen.Wait(450)
        if Showing then
            local playerPed = PlayerPedId()
	        local playerX, playerY, playerZ = table.unpack(GetEntityCoords(playerPed))
            SendNUIMessage({
                action = "ShowCoords",
                coordsX = playerX,
                coordsY = playerY,
                coordsZ = playerZ,
            })
            print(playerX, playerY, playerZ)
            SendNUIMessage({
                type = 'clipboard',
                data = '' .. vec(playerX, playerY, playerZ)
            })
        end
    end
end)

function Notification (str) 
    SetNotificationTextEntry('STRING')
    AddTextComponentString(str)
    DrawNotification(0, 1)
end