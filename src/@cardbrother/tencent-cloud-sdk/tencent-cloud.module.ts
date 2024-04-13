import { DynamicModule } from '@nestjs/common';
import {
  TencentCloudModuleOptions,
  TencentCloudModuleTokenKey,
} from './tencent-cloud.interface';
import { TencentCloudService } from './tencent-cloud.service';

export class TencentCloudModule {
  static forRoot(options: TencentCloudModuleOptions): DynamicModule {
    return {
      module: TencentCloudModule,
      providers: [
        {
          provide: TencentCloudModuleTokenKey,
          useValue: options,
        },
        TencentCloudService,
      ],
      exports: [TencentCloudModuleTokenKey],
    };
  }
}
