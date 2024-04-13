import { DynamicModule, Module } from '@nestjs/common';
import {
  TencentCloudModuleOptions,
  TencentCloudModuleTokenKey,
} from './tencent-cloud.interface';
import { TencentCloudService } from './tencent-cloud.service';

@Module({
  providers: [TencentCloudService],
  exports: [TencentCloudService, TencentCloudModuleTokenKey],
})
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
