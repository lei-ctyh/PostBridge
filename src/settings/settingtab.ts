import {App, Notice, PluginSettingTab, Setting, TFolder} from "obsidian";
import PostBridgePlugin from "../../main";
import {SettingManager} from "./setting-manager";

export class PbSettingTab extends PluginSettingTab {
	private plugin: PostBridgePlugin;

	constructor(app: App, plugin: PostBridgePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl: contentEl} = this;
		contentEl.empty();
		contentEl.createEl("h6", {text: "基础设置"})
		const basicDivElement = contentEl.createDiv();
		// 获取所有文章目录
		let all_dir = this.app.vault.getAllLoadedFiles().filter((file) => file instanceof TFolder);
		new Setting(basicDivElement)
			.setName('同步文章目录')
			.setDesc('选择文章目录，同步文章时将只上传该目录下的文章')
			.addDropdown(dropdown => {
				dropdown.selectEl.style.width = "165px";
				all_dir.forEach((dir) => {
					dropdown.addOption(dir.path, dir.path);
				})
				dropdown.setValue(SettingManager.getSetting('base', 'location_posts'))
				dropdown.onChange(async (value) => {
					await SettingManager.saveSetting('base', 'location_posts', value);
				})
			});

		new Setting(basicDivElement)
			.setName('节流模式')
			.setDesc('启用节流模式后，文章中的图片会根据一定的规则进行上传，节省接口调用次数')
			.addToggle(toggle => toggle
				.setValue(SettingManager.getSetting('base', 'throttling_mode'))
				.onChange(async (value) => {
					await SettingManager.saveSetting('base', 'throttling_mode', value);
				}))

		const cnblogDivElement = contentEl.createDiv();
		cnblogDivElement.createEl("h6", {text: "博客园"})
		cnblogDivElement.style.marginTop = "20px";
		new Setting(cnblogDivElement)
			.setName('博客园同步')
			.setDesc('启用后，文章将同步到博客园')
			.addToggle(toggle => toggle
				.setValue(SettingManager.getSetting('cnblog', 'enable'))
				.onChange(async (value) => {
					await SettingManager.saveSetting('cnblog', 'enable', value);
				}));
		new Setting(cnblogDivElement)
			.setName('测试链接')
			.setDesc('测试博客园MetaWeblog的链接是否可用')
			.addButton(button => button
				.setButtonText('测试')
				.onClick(async () => {
					new Notice('正在测试博客园MetaWeblog的链接可用性...')
				})
			);
		new Setting(cnblogDivElement)
			.setName('MetaWeblog访问地址')
			.addText(text => text
				.setPlaceholder('MetaWeblog访问地址')
				.setValue(SettingManager.getSetting('cnblog', 'blog_url'))
				.onChange(async (value) => {
					await SettingManager.saveSetting('cnblog', 'blog_url', value);
				}));
		new Setting(cnblogDivElement)
			.setName('MetaWeblog登录名')
			.addText(text => text
				.setPlaceholder('MetaWeblog登录名')
				.setValue(SettingManager.getSetting('cnblog', 'username'))
				.onChange(async (value) => {
					await SettingManager.saveSetting('cnblog', 'username', value);
				}));
		new Setting(cnblogDivElement)
			.setName('MetaWeblog访问令牌')
			.addText(text => text
				.setPlaceholder('MetaWeblog访问令牌')
				.setValue(SettingManager.getSetting('cnblog', 'password'))
				.onChange(async (value) => {
					await SettingManager.saveSetting('cnblog', 'password', value);
				})
				.inputEl.type = "password");
	}
}
