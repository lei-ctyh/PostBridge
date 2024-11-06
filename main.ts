import {
	Plugin,
} from 'obsidian';

import {SettingManager} from './src/settings/setting-manager';
import {PbSettingTab} from "./src/settings/settingtab";
import {rightClickToUpload} from "./src/events/register";

export default class PostBridgePlugin extends Plugin {
	private static instance: PostBridgePlugin;
	async onload() {
		this.initPlugin();
		// 注册指令到右键的文件菜单
		this.registerEvent(rightClickToUpload());
	}

	onunload() {
	}

	/**
	 * 初始化插件
	 * @private
	 */
	private initPlugin() {
		PostBridgePlugin.instance = this;
		SettingManager.loadSettings(this.loadData())
		this.addSettingTab(new PbSettingTab(this.app, this));
	}


	public static getInstance(): PostBridgePlugin {
		if (!PostBridgePlugin.instance) {
			throw new Error('PostBridgePlugin is not initialized yet');
		}
		return this.instance;
	}
}
