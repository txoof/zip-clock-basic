input.onButtonPressed(Button.A, function () {
    change_by = 1
    if (set_time_mode == true) {
        set_time_array = [kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)]
        set_time_array[1] = set_time_array[1] + change_by
        if (set_time_array[1] > 59) {
            set_time_array[1] = 0
            set_time_array[2] = set_time_array[2] + 1
        }
        if (set_time_array[2] > 12) {
            set_time_array[2] = 0
        }
        kitronik_halo_hd.setTime(set_time_array[2], set_time_array[1], set_time_array[0])
    }
})
input.onButtonPressed(Button.AB, function () {
    set_time_mode = !(set_time_mode)
    haloDisplay.clear()
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    change_by = 10
    if (set_time_mode == true) {
        set_time_array = [kitronik_halo_hd.readTimeParameter(TimeParameter.Seconds), kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes), kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)]
        set_time_array[1] = set_time_array[1] + change_by
        if (set_time_array[1] > 59) {
            set_time_array[1] = 0
            set_time_array[2] = set_time_array[2] + 1
        }
        if (set_time_array[2] > 12) {
            set_time_array[2] = 0
        }
        kitronik_halo_hd.setTime(set_time_array[2], set_time_array[1], set_time_array[0])
    }
})
function display_smh (time_array: any[], clear: boolean) {
    if (clear) {
        set_color = [kitronik_halo_hd.colors(ZipLedColors.Black), kitronik_halo_hd.colors(ZipLedColors.Black), kitronik_halo_hd.colors(ZipLedColors.Black)]
    } else {
        set_color = hand_colors
    }
    haloDisplay.setZipLedColor(time_array[1], set_color[1])
    haloDisplay.setZipLedColor(time_array[2], set_color[2])
    haloDisplay.setZipLedColor(time_array[0], set_color[0])
}
function set_time_indicator () {
    if (indicator_toggle == 0) {
        basic.showLeds(`
            . # # . .
            . # # . .
            . . . . .
            . # # . .
            . # # . .
            `)
        indicator_toggle = 1
    }
    if (indicator_toggle == 1) {
        basic.showLeds(`
            . . # # .
            . . # # .
            . . . . .
            . . # # .
            . . # # .
            `)
        indicator_toggle = 0
    }
}
let old_time_array: number[] = []
let set_color: number[] = []
let set_time_array: number[] = []
let change_by = 0
let set_time_mode = false
let time_array: number[] = []
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
let hand_colors: number[] = []
let indicator_toggle = 0
indicator_toggle = 0
hand_colors = [kitronik_halo_hd.colors(ZipLedColors.Red), kitronik_halo_hd.colors(ZipLedColors.Blue), kitronik_halo_hd.colors(ZipLedColors.Green)]
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
time_array = [kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.readTimeForZip(TimeParameter.Hours)]
let last_second = time_array[0]
set_time_mode = false
basic.showString("..")
basic.forever(function () {
    old_time_array = time_array
    time_array = [kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.readTimeForZip(TimeParameter.Hours)]
    if (set_time_mode == true) {
        set_time_indicator()
        display_smh(old_time_array, true)
        display_smh(time_array, false)
        haloDisplay.show()
    } else {
        if (last_second != time_array[0]) {
            display_smh(old_time_array, true)
            display_smh(time_array, false)
            haloDisplay.show()
        }
        last_second = time_array[0]
    }
})
