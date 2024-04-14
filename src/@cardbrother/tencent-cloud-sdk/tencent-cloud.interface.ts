// Definition: TencentCloudModuleOptions
/**
 * @name TencentCloudModuleOptions
 * @description TencentCloudModuleOptions is an interface for the options that can be passed to the `forRoot` method of the `TencentCloudModule`.
 * @property {string} [apiKey] The API key for the Tencent Cloud service.
 * @property {string} [apiSecret] The API secret for the Tencent Cloud service.
 * @property {string} [region] The region for the Tencent Cloud service.
 */
export interface TencentCloudModuleOptions {
  apiKey?: string;
  apiSecret?: string;
  region: string;
}

// TencentCloudModuleTokenKey
export const TencentCloudModuleTokenKey = 'TENCENT_CLOUD_MODULE_OPTIONS';
