import { ModuleMetadata, Type } from '@nestjs/common';
import { AbstractClient } from 'tencentcloud-sdk-nodejs/tencentcloud/common/abstract_client';
import { ClientProfile } from 'tencentcloud-sdk-nodejs/tencentcloud/common/interface';

import { OcrProvider } from './ocr/ocr.provider';
import { SmsProvider } from './sms/sms.provider';

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

/**
 * @name TencentCloudAsyncModuleOptions
 * @description TencentCloudAsyncModuleOptions is an interface for the options that can be passed to the `forRootAsync` method of the `TencentCloudModule`.
 * @param {Function} useFactory The factory function that will be used to create the options.
 * @param {Array} inject The dependencies that will be injected into the factory function.
 * @returns {Promise<TencentCloudModuleOptions> | TencentCloudModuleOptions}
 */
export interface TencentCloudAsyncModuleOptions<
  T extends TencentCloudModuleOptions,
> extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => Promise<T> | T;
  inject?: any[];
  useClass?: Type<T>;
  useExisting?: Type<T>;
  global?: boolean;
}

// TencentCloudClientType Instance Object Enum
export enum TencentCloudClientType {
  SMS = 'SMS', // 短信
  OCR = 'OCR', // OCR 图像识别
  // COS = 'COS', // 对象存储
}

/**
 * @name ClientTypeToClassMap
 * @description ClientTypeToClassMap is an interface that maps the `TencentCloudClientType` to the class that implements the client.
 */
export interface ClientTypeToClassMap {
  SMS: SmsProvider;
  OCR: OcrProvider;
}
