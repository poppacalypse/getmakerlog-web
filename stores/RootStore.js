import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable, computed } from "mobx";

class RootStore extends BaseStore {
  @observable ready = false;

  @action setReady(value) {
    this.ready = value;
  }
}

export const getRootStore = getOrCreateStore("root", RootStore);
