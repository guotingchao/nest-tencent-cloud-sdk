<h1 align="center">@cardbrother/nestjs-tencent-cloud-sdk</h1>

[![CI](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml) [![Release & Publish](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml) [![package version](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk.svg)](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk) ![NPM Downloads](https://img.shields.io/npm/d18m/%40cardbrother%2Fnestjs-tencent-cloud-sdk) ![GitHub language count](https://img.shields.io/github/languages/count/guotingchao/nest-tencent-cloud-sdk?color=green)![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/main?logo=github&logoColor=green&color=%23FF40E0D0)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/develop?logo=github&logoColor=green&label=Develop%20Commits&color=%23FF40E0D0)

Language: [English](README.md) | [中文](README_ZH.md)

> Tencent Cloud SDK for NestJS Developers

## 🔨 Installation

- npm

```bash
npm install @cardbrother/nest-tencent-cloud-sdk
```

- yarn

```bash
$ yarn add @cardbrother/nest-tencent-cloud-sdk
```

- 🚀 pnpm **Recommended**

```bash
$ pnpm add @cardbrother/nest-tencent-cloud-sdk
```

## 🍚 Usage

> In your `AppModule`or `FeatureModule` module, import the `TencentCloudModule` and call the `forRoot` method to configure the Tencent Cloud SDK with your `secretId` and `secretKey`:

#### **Basic usage:**

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
      global: true, // if true, the TencentCloudService will be a global service, default is false
    }),
  ],
})
export class AppModule {}
```

---

#### **Dynamic useage**

> If you want to use a dynamic configuration, you can use the `forRootAsync` method to configure the Tencent Cloud SDK with your `secretId` and `secretKey`:

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
        global: true, // if true, the TencentCloudService will be a global service, default is false
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
    }),
  ],
})
export class AppModule {}
```

#### **Use TencentCloudService**

```ts
import { Injectable } from '@nestjs/common';
import { TencentCloudService } from '@cardbrother/nest-tencent-cloud-sdk';

@Injectable()
export class AppService {
  constructor(
    private readonly tencentCloudService: TencentCloudService,
    @Inject(TENCENT_CLOUD_MODULE_OPTIONS_TOKEN)
    private readonly options: TencentCloudModuleOptions, // If u want to get the options u can use this
  ) {}

  // imgData is a base64 string
  async useOCR(imgData: string) {
    // Here the encapsulated object is dynamically instantiated based on the enumeration
    const ocrClient = await this.tencentCloudService.useClient('OCR'); // or SMS,COS,etc
    return ocrClient.fastOcr({
      ImageBase64: imgData,
    });
  }
}
```

#### **Usage Tencent COS**

> 💡 Tips: If you pass Bucket, Region, or any parameter here it overrides the configuration at the time of imported module the reference, if you don't pass it then the import `TencentCloudModule.forRoot` configuration is used.

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
