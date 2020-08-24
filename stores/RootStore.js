import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable, computed } from "mobx";
import { getLogger } from "utils/logging";

const log = getLogger("RootStore");

class RootStore extends BaseStore {
	@observable ready = false;
	@observable mobileSidebarOpen = false;

	@action.bound toggleMobileSidebar(val = null) {
		const nextVal = val !== null ? val : !this.mobileSidebarOpen;
		log(`${nextVal ? "Opening" : "Closing"} sidebar.`);
		this.mobileSidebarOpen = nextVal;
	}

	@action.bound setReady(value) {
		this.ready = value;
	}
}

export const getRootStore = getOrCreateStore("root", RootStore);
