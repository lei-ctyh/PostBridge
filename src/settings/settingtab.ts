import {App, PluginSettingTab, Setting, TFolder} from "obsidian";
import PostBridgePlugin from "../../main";
import {SettingManager, VendorType} from "./setting-manager";

export class PbSettingTab extends PluginSettingTab {
	private plugin: PostBridgePlugin;

	constructor(app: App, plugin: PostBridgePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl: contentEl} = this;
		contentEl.empty();
		new Setting(contentEl)
			.setName('blog_url')
			.setDesc('博客园MetaWeblog访问地址')
			.addText(text => text
				.setPlaceholder('MetaWeblog访问地址')
				.setValue(SettingManager.getSetting(VendorType.CNBLOG, 'blog_url'))
				.onChange(async (value) => {
					await SettingManager.saveSetting(VendorType.CNBLOG, 'blog_url', value);
				}));
		new Setting(contentEl)
			.setName('username')
			.setDesc('MetaWeblog登录名')
			.addText(text => text
				.setPlaceholder('MetaWeblog登录名')
				.setValue("")
				.onChange(async (value) => {
				}));
		new Setting(contentEl)
			.setName('password')
			.setDesc('MetaWeblog访问令牌')
			.addText(text => text
				.setPlaceholder('MetaWeblog访问令牌')
				.setValue("")
				.onChange(async (value) => {
				}));

		// 获取所有文章目录
		let all_dir = this.app.vault.getAllLoadedFiles().filter((file) => file instanceof TFolder);
		new Setting(contentEl)
			.setName('location_posts')
			.setDesc('同步文章目录')
			.setTooltip('同步文章目录, 默认是所有文章')
			.addDropdown(dropdown => {
				dropdown.selectEl.style.width = "165px";
				all_dir.forEach((dir) => {
					dropdown.addOption(dir.path, dir.path);
				})
				dropdown.setValue("")
				dropdown.onChange(async (value) => {
				})
			});

		new Setting(contentEl)
			.setName('throttling_mode')
			.setDesc('节流模式')
			.addToggle(toggle => toggle
				.setTooltip('节流后, 已上传图片不会再上传, 节省接口调用次数')
				.setValue(true)
				.onChange(async (value) => {

				}))



		const contentDiv = contentEl.createEl("div");
		contentDiv.style.display = "flex";
		contentDiv.style.paddingTop = '15px';
		contentDiv.style.borderTop = "1px solid #e6e6e6";
	}
}
