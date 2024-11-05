import PostBridgePlugin from "../../main";

export const DEFAULT_SETTING: object = {

	cnblog: {
		enable: true,
		blog_url: "",
		// blog_id 这个参数暂时没有用到
		blog_id: "",
		username: "",
		password: "",

	},
	hexo: {
		enable: true,
		blog_url: "",
		username: "",
		password: "",
		location_posts: "",
		throttling_mode: true
	},
	base: {
		// 需要同步的文章目录, 默认是所有文章, 路径/子路径
		location_posts: "",
		throttling_mode: true
	}
}


export class SettingManager {
	// 所有插件配置的集合
	private static CACHE_SETTING : any = {} ;

	/**
	 * 加载所有对接厂商的配置
	 * @param data
	 */
	public static loadSettings(data: Promise<any>): void {
		data.then(async (settings: any) => {
			this.CACHE_SETTING = Object.assign({}, DEFAULT_SETTING, settings)
		})
	}

	/**
	 * 获取某个厂商的单个参数配置
	 * @param vendor
	 * @param key
	 */
	public static getSetting(vendor: string, key: string): any {
		const setting = this.CACHE_SETTING[vendor];
		if (setting && typeof setting === 'object' && key in setting) {
			return setting[key];
		}
		throw new Error(`Unknown setting ${key}`);
	}

	/**
	 * 保存某个厂商的单个参数配置
	 * @param vendor
	 * @param key
	 * @param value
	 */
	public static async saveSetting(vendor: string, key: string, value: any): Promise<void> {
		const setting = this.CACHE_SETTING[vendor];
		if (setting && typeof setting === 'object' && key in setting) {
			(setting as any)[key] = value;
		}else {
			throw new Error(`Setting ${key} not found in vendor ${vendor}`);
		}
		await PostBridgePlugin.getInstance().saveData(this.CACHE_SETTING);
	}

}

