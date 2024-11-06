/**
 * 目标接口，以博客园接口为主
 */

export interface UploadInterface {
	/**
	 * 上传图片
	 * @param name 图片名称
	 * @param type 图片类型
	 * @param base64 图片base64编码
	 */
	newMediaObject(name: string, type: string, base64: string): void;
}

