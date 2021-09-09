def on_button_pressed_a():
    global minutes
    minutes += 1
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global enterTime, setTimeMode
    if setTimeMode == True or setAlarmMode == True:
        enterTime = True
    else:
        setTimeMode = True
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global minutes
    minutes += 10
input.on_button_pressed(Button.B, on_button_pressed_b)

hours = 0
enterNewTime = False
enterTime = False
setTimeMode = False
minutes = 0
setAlarmMode = False
haloDisplay = kitronik_halo_hd.create_zip_halo_display(60)
setAlarmMode = False

def on_forever():
    global enterNewTime, minutes, hours
    if setTimeMode == True:
        enterNewTime = False
        minutes = kitronik_halo_hd.read_time_parameter(TimeParameter.MINUTES)
        hours = kitronik_halo_hd.read_time_parameter(TimeParameter.HOURS)
        if hours >= 12:
            hours += -12
        while enterNewTime == False:
            if minutes > 59:
                minutes = 0
                hours += 1
                if hours == 12:
                    hours = 0
        kitronik_halo_hd.set_time(hours, minutes, 0)
        enterNewTime = False
        setTimeMode = False
    else:
        pass

basic.forever(on_forever)
