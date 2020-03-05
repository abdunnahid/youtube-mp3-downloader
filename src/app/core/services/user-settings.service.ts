import { Injectable } from '@angular/core';

export interface UserSettings {
  pathToSave?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private _settings: UserSettings;

  constructor() { }

  get settings(): UserSettings {
    this._settings = JSON.parse(localStorage.getItem('ymd_user_settings'))
    return this._settings;
  }
  set settings(settings: UserSettings) {
    const currentSettings = this.settings || {};
    Object.assign(currentSettings, settings);
    localStorage.setItem('ymd_user_settings', JSON.stringify(currentSettings))
  }
}
