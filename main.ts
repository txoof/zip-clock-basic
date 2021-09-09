input.onButtonPressed(Button.AB, function () {
	
})
function display_smh (time_array: any[], clear: boolean) {
    hand_colors = [kitronik_halo_hd.colors(ZipLedColors.Red), kitronik_halo_hd.colors(ZipLedColors.Blue), kitronik_halo_hd.colors(ZipLedColors.Green)]
    if (clear) {
        set_color = [kitronik_halo_hd.colors(ZipLedColors.Black), kitronik_halo_hd.colors(ZipLedColors.Black), kitronik_halo_hd.colors(ZipLedColors.Black)]
    } else {
        set_color = hand_colors
    }
    haloDisplay.setZipLedColor(time_array[1], set_color[1])
    haloDisplay.setZipLedColor(time_array[2], set_color[2])
    haloDisplay.setZipLedColor(time_array[0], set_color[0])
}
let old_time_array: number[] = []
let set_color: number[] = []
let hand_colors: number[] = []
let time_array: number[] = []
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
time_array = [kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.readTimeForZip(TimeParameter.Hours)]
let last_second = time_array[0]
basic.forever(function () {
    old_time_array = time_array
    time_array = [kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.readTimeForZip(TimeParameter.Hours)]
    if (last_second != time_array[0]) {
        display_smh(old_time_array, true)
        display_smh(time_array, false)
        haloDisplay.show()
    }
    last_second = time_array[0]
})
