import PostBridgePlugin from "../../main";
import {SettingManager} from "../settings/setting-manager";
import {TFile} from "obsidian";

/**
 * 文章右键上传事件
 */
export const register = () => {
	return PostBridgePlugin.getInstance().app.workspace.on("file-menu", (menu, file) => {
		// 判断文件是否在同步目录下
		let location_posts = SettingManager.getSetting('base', 'location_posts')
		if (!file.path.startsWith(location_posts) && location_posts != "/" && location_posts != "" && location_posts != undefined) {
			return;
		}
		if (file instanceof TFile) {
			if (file.extension === "md") {
				menu.addItem((item) =>item
						.setTitle("一键同步")
						.setIcon("upload")
						.onClick(async () => {
						})
				);
			}

		}
	})

}
