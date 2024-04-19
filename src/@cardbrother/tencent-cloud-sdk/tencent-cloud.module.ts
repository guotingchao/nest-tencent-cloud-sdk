import { DynamicModule, Module } from '@nestjs/common';

import { ClientFactoryProvider } from './client-factory.provider';
import { OcrProvider } from './ocr/ocr.provider';
import { SmsProvider } from './sms/sms.provider';
import {
  TENCENT_CLOUD_MODULE_OPTIONS_TOKEN,
  TencentCloudModuleOptions,
} from './tencent-cloud.interface';
import { TencentCloudService } from './tencent-cloud.service';

@Module({
  providers: [TencentCloudService, OcrProvider, SmsProvider],
  exports: [TencentCloudService, OcrProvider, SmsProvider],
})
export class TencentCloudModule {
  static forRoot(options: TencentCloudModuleOptions): DynamicModule {
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
}
