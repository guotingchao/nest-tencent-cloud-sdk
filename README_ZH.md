<h1 align="center">@cardbrother/nestjs-tencent-cloud-sdk</h1>

[![CI](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml) [![Release & Publish](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml) [![package version](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk.svg)](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk) ![NPM Downloads](https://img.shields.io/npm/d18m/%40cardbrother%2Fnestjs-tencent-cloud-sdk) ![GitHub language count](https://img.shields.io/github/languages/count/guotingchao/nest-tencent-cloud-sdk?color=green)![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/main?logo=github&logoColor=green&color=%23FF40E0D0)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/develop?logo=github&logoColor=green&label=Develop%20Commits&color=%23FF40E0D0)

Language: [English](README.md) | [中文](README_ZH.md)

> 腾讯云 SDK 适用于 NestJS 开发者

## 🔨 安装

- npm

```bash
npm install @cardbrother/nest-tencent-cloud-sdk
```

- yarn

```bash
$ yarn add @cardbrother/nest-tencent-cloud-sdk
```

- 🚀 pnpm **推荐**

```bash
$ pnpm add @cardbrother/nest-tencent-cloud-sdk
```

## 🍚 使用

> 在 `AppModule` 或 `FeatureModule` 模块中，导入 `TencentCloudModule` 并调用 `forRoot` 方法配置 Tencent Cloud SDK 的 `secretId` 和 `secretKey`：

#### **基础使用:**

```ts
import { Module } from '@nestjs/common';
import { TencentCloudModule } from '@cardbrother/nest-tencent-cloud-sdk';

@Module({
  imports: [
    TencentCloudModule.forRoot({
      apiId: 'TENCENT_API_ID',
      apiSecret: 'TENCENT_API_SECRET',
      region: 'TENCENT_REGION',
      cos: {
        Bucket: 'COS_BUCKET',
        Region: 'COS_REGION',
        SecretId: 'COS_SECRET_ID',
        SecretKey: 'COS_SECRET_KEY',
      },
      global: true, // 如果为 true，则 TencentCloudService 将是全局服务，默认为 false
    }),
  ],
})
export class AppModule {}
```

---

#### **动态模块导入**

> 如果您想使用动态配置，可以使用 `forRootAsync` 方法将您的 `secretId` 和 `secretKey` 配置为腾讯云 SDK：

```ts
import { TencentCloudModule } from '@cardbrother/nestjs-tencent-cloud-sdk';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TencentCloudModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        apiId: configService.get<string>('TENCENT_API_ID'),
        apiSecret: configService.get<string>('TENCENT_API_SECRET'),
        region: configService.get<string>('TENCENT_REGION', 'ap-shanghai'),
        cos: {
          Bucket: configService.get<string>('COS_BUCKET'),
          Region: configService.get<string>('COS_REGION'),
          SecretId: configService.get<string>('COS_SECRET_ID'),
          SecretKey: configService.get<string>('COS_SECRET_KEY'),
        },
        global: true, // 如果为 true，则 TencentCloudService 将是全局服务，默认为 false
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
    }),
  ],
})
export class AppModule {}
```

#### **使用 TencentCloudService**

```ts
import { Injectable } from '@nestjs/common';
import { TencentCloudService } from '@cardbrother/nest-tencent-cloud-sdk';

@Injectable()
export class AppService {
  constructor(
    private readonly tencentCloudService: TencentCloudService,
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    private readonly options: TencentCloudModuleOptions, // 如果您想获取选项，可以使用这个
  ) {}

  // 使用 OCR 服务
  async useOCR(imgData: string) {
    // 封装对象是智能的根据枚举动态实例化的
    const ocrClient = await this.tencentCloudService.useClient('OCR'); // or SMS,COS,etc
    return ocrClient.fastOcr({
      ImageBase64: imgData,
    });
  }
}
```

#### **使用 Tencent COS**

> 💡 提示：如果在此处传递 Bucket、Region 或任何参数，则会覆盖导入模块时的配置；如果不传递，则会使用导入的 `TencentCloudModule.forRoot` 配置。

```ts
const cosClient = await this.tencentCloudService.useClient('COS');
cosClient.upload({
  Bucket: this.options.cos.Bucket, // It's not required. Default use the configuration at the Module Import time
  Region: this.options.cos.Region, // It's not required. Default use the configuration at the Module Import time
  Key: 'test.txt',
  Body: 'hello world',
  FilePath: 'test.txt',
});
```

#### 📝 [CHANGELOG](CHANGELOG.md)

#### License [MIT](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/LICENSE)
