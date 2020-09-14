import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable } from "mobx";
import { getLogger } from "utils/logging";
import { useStores } from "utils/hooks";
import { useObserver } from "mobx-react";

const log = getLogger("RootStore");

class RootStore extends BaseStore {
	@observable ready = false;
	@observable mobileSidebarOpen = false;
	@observable editorOpen = false;

	@action.bound toggleMobileSidebar(val = null) {
		const nextVal = val !== null ? val : !this.mobileSidebarOpen;
		log(`${nextVal ? "Opening" : "Closing"} sidebar.`);
		this.mobileSidebarOpen = nextVal;
	}

	@action.bound toggleEditor() {
		this.editorOpen = !this.editorOpen;
	}

	@action.bound setReady(value) {
		this.ready = value;
	}
}

export const getRootStore = getOrCreateStore("root", RootStore);

export function useRoot() {
	const { root } = useStores();
	return useObserver(() => ({
		ready: root.ready,
		editorOpen: root.editorOpen,
		mobileSidebarOpen: root.mobileSidebarOpen,
		toggleMobileSidebar: root.toggleMobileSidebar,
		toggleEditor: root.toggleEditor,
	}));
}
