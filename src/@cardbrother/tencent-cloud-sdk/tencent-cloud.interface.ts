import { AbstractClient } from 'tencentcloud-sdk-nodejs/tencentcloud/common/abstract_client';
import { ClientProfile } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface';

// TencentCloudClient interface
export class TencentCloudAbstructClient extends AbstractClient {
  constructor(
    endpoint: string,
    version: string,
    options: TencentCloudModuleOptions,
  ) {
    super(endpoint, version, {
      credential: {
        secretId: options.apiId,
        secretKey: options.apiSecret,
      },
      region: options.region,
      profile: options.profile,
    });
  }
}

// TencentCloudModuleTokenKey for options
export const TENCENT_CLOUD_MODULE_OPTIONS_TOKEN =
  'TENCENT_CLOUD_MODULE_OPTIONS_TOKEN';
/**
 * @name TencentCloudModuleOptions
 * @param {string} apiKey The API key for the Tencent Cloud service.
 * @param {string} apiSecret The API secret for the Tencent Cloud service.
 * @param {string} region The region for the Tencent Cloud service.
 * @description TencentCloudModuleOptions is an interface for the options that can be passed to the `forRoot` method of the `TencentCloudModule`.
 */
export interface TencentCloudModuleOptions {
  apiId?: string;
  apiSecret?: string;
  region: string;
  global?: true;
  profile?: ClientProfile;
}

// ClientType enum

export const enum EClientType {
  SMS = 'sms',
  COS = 'cos',
  OCR = 'ocr',
}
