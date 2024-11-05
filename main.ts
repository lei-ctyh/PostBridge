import {App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, SettingTab} from 'obsidian';

import {SettingManager} from './src/settings/setting-manager';
import {PbSettingTab} from "./src/settings/settingtab";
import {register} from "./src/events/register";

export default class PostBridgePlugin extends Plugin {
	async onload() {
		this.initPlugin();
		// 注册指令到右键的文件菜单
		this.registerEvent(register());
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

	private static instance: PostBridgePlugin;
	public static getInstance(): PostBridgePlugin {
		if (!PostBridgePlugin.instance) {
			throw new Error('PostBridgePlugin is not initialized yet');
		}
		return this.instance;
	}
}
