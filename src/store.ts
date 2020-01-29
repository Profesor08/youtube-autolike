import { observable, computed } from "mobx";
import i18n from "i18next";

export interface IChannel {
  name: string;
  id: string;
  image?: string;
}

export interface ILanguage {
  name: string;
  locale: string;
  image: string;
}

class Store {
  @observable private _likeAll: boolean = true;
  @observable private _channels: IChannel[] = [];
  @observable private _likeDelay: number = 1.2;
  @observable private _lang: string = "en-US";
  @observable public channel: IChannel | null = null;

  constructor() {
    this.load();

    // @ts-ignore
    chrome.storage.onChanged.addListener(changes => {
      if ("youtube-autolike-config" in changes) {
        const storageChange = changes["youtube-autolike-config"];
        this.updateData(storageChange.newValue);
      }
    });
  }

  @computed
  get likeAll(): boolean {
    return this._likeAll;
  }

  set likeAll(value: boolean) {
    this._likeAll = value;
    this.save();
  }

  @computed
  get channels(): IChannel[] {
    return [...this._channels];
  }

  addChannel(channel: IChannel) {
    if (false === this.hasChannel(channel)) {
      this._channels.push(channel);
      this.save();
    }
  }

  removeChannel(channel: IChannel) {
    this._channels = this._channels.filter(c => c.id !== channel.id);
    this.save();
  }

  hasChannel(channel: IChannel | null) {
    if (channel) {
      return undefined !== this._channels.find(c => c.id === channel.id);
    }

    return false;
  }

  @computed
  get likeDelay(): number {
    return this._likeDelay;
  }

  set likeDelay(value: number) {
    this._likeDelay = value;
    this.save();
  }

  @computed
  get lang(): string {
    return this._lang;
  }

  set lang(value: string) {
    this._lang = value;
    this.save();
  }

  private save() {
    try {
      // @ts-ignore
      chrome.storage.local.set({
        "youtube-autolike-config": {
          likeAll: this._likeAll,
          likeDelay: this._likeDelay,
          lang: this._lang,
          channels: [...this._channels],
        },
      });
    } catch (err) {
      console.warn(err);
    }
  }

  private load() {
    try {
      // @ts-ignore
      chrome.storage.local.get(["youtube-autolike-config"], (result: any) => {
        if (result["youtube-autolike-config"] !== undefined) {
          this.updateData(result["youtube-autolike-config"]);
        }
      });
    } catch (err) {
      console.warn(err);
    }
  }

  private updateData(data: any) {
    const config: any = { ...data };

    if (typeof config.likeAll === "boolean") {
      this._likeAll = config.likeAll;
    }

    if (typeof config.likeDelay === "number") {
      this._likeDelay = config.likeDelay;
    }

    if (typeof config.lang === "string") {
      this._lang = config.lang;
      i18n.changeLanguage(config.lang);
    }

    if (Array.isArray(config.channels)) {
      this._channels = config.channels;
    }
  }
}

const store = new Store();

export default store;
