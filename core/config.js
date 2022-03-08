/**
 * 非常重要，上线一定记得改为false，页面vconsole
 * 另一种显示vconsole的方法是url添加参数debug=1，多用于线上排查问题
 */
export const isDebug = false;

/**
 * 此处的配置应该和/assets/css/var.less 中的配置保持一致，用于部署在非根目录
 */
export const subdir = '/test/';
export const activeName = 'test';
