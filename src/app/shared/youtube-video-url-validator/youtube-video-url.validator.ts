import { AbstractControl } from "@angular/forms";

export function ValidateYoutubeVideoUrl(control: AbstractControl) {
    if (!isValidYoutubeVideoUrl(control.value)) {
        return { validUrl: true };
    }
    return null;
}

export function isValidYoutubeVideoUrl(url: string) {
    const youtubeUrl = JSON.parse(JSON.stringify(url));
    if (youtubeUrl != undefined || youtubeUrl != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = youtubeUrl.match(regExp);
        if (match && match[2].length == 11) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}