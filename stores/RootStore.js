import { BaseStore, getOrCreateStore } from "next-mobx-wrapper";
import { action, observable } from "mobx";
import { useStores } from "utils/hooks";
import { useObserver } from "mobx-react";

class RootStore extends BaseStore {
	@observable ready = false;
	@observable editorOpen = false;

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
		toggleEditor: root.toggleEditor,
	}));
}
