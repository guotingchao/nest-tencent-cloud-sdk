import { DynamicModule, Module, Provider } from '@nestjs/common';

import { ClientFactoryProvider } from './client-factory.provider';
import { OcrProvider } from './ocr/ocr.provider';
import { SmsProvider } from './sms/sms.provider';
import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudAsyncModuleOptions,
  TencentCloudModuleOptions,
} from './tencent-cloud.interface';
import { TencentCloudService } from './tencent-cloud.service';

/**
 * @name TencentCloudModule
 * @description This module is used to provide the TencentCloudService, OcrProvider, and SmsProvider to the application.
 * @param {TencentCloudModuleOptions} options - The options to be used for the module.
 * @returns {DynamicModule}
 */
@Module({
  providers: [TencentCloudService, OcrProvider, SmsProvider],
  exports: [TencentCloudService, OcrProvider, SmsProvider],
})
export class TencentCloudModule {
  public static forRoot(options: TencentCloudModuleOptions): DynamicModule {
    const isGlobal = options.global || false;
    return {
      module: TencentCloudModule,
      providers: [
        {
          provide: TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
          useValue: options,
        },
        ClientFactoryProvider,
        TencentCloudService,
      ],
      exports: [
        TencentCloudService,
        ClientFactoryProvider,
        TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
      ],
      global: isGlobal,
    };
  }

  public static async forRootAsync(
    options: TencentCloudAsyncModuleOptions<TencentCloudModuleOptions>,
  ): Promise<DynamicModule> {
    const isGlobal = options.global || false;
    return {
      module: TencentCloudModule,
      imports: options.imports || [],
      providers: [
        ...this.createSyncProivders(options),
        ClientFactoryProvider,
        TencentCloudService,
      ],
      exports: [
        TencentCloudService,
        ClientFactoryProvider,
        TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
      ],
      global: isGlobal,
    };
  }

  private static createSyncProivders(
    options: TencentCloudAsyncModuleOptions<TencentCloudModuleOptions>,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider({
        ...options,
        useExisting: options.useClass,
      }),
    ];
  }

  private static createAsyncOptionsProvider(
    options: TencentCloudAsyncModuleOptions<TencentCloudModuleOptions>,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
      useExisting: options.useExisting,
    };
  }
}
