<h1 align="center">
    <span style="color:#FF0000;">@</span><span style="color:#F90006;">c</span><span style="color:#F3000C;">a</span><span style="color:#ED0012;">r</span><span style="color:#E70018;">d</span><span style="color:#E1001E;">b</span><span style="color:#DB0024;">r</span><span style="color:#D5002A;">o</span><span style="color:#CF0030;">t</span><span style="color:#C90036;">h</span><span style="color:#C3003C;">e</span><span style="color:#BD0042;">r</span><span style="color:#B70048;">/</span><span style="color:#B1004E;">n</span><span style="color:#AB0054;">e</span><span style="color:#A5005A;">s</span><span style="color:#9F0060;">t</span><span style="color:#990066;">j</span><span style="color:#93006C;">s</span><span style="color:#8D0072;">-</span><span style="color:#870078;">t</span><span style="color:#81007E;">e</span><span style="color:#7B0084;">n</span><span style="color:#75008A;">c</span><span style="color:#6F0090;">e</span><span style="color:#690096;">n</span><span style="color:#63009C;">t</span><span style="color:#5D00A2;">-</span><span style="color:#5700A8;">c</span><span style="color:#5100AE;">l</span><span style="color:#4B00B4;">o</span><span style="color:#4500BA;">u</span><span style="color:#3F00C0;">d</span><span style="color:#3900C6;">-</span><span style="color:#3300CC;">s</span><span style="color:#2D00D2;">d</span><span style="color:#2700D8;">k</span>
</h1>
<p style="text-align:center;display:flex;justify-content:center;gap:5px;" align="center">
  <a href="https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/CI.yml">
    <img alt="CI" src="https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/CI.yml/badge.svg"/>
  </a>
  <a href="https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml">
    <img alt="Release &amp; Publish" src="https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml/badge.svg"/>
  </a>
  <a href="https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk">
    <img alt="package version" src="https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk.svg"/>
  </a>
  <a href="https://www.npmjs.com/package/@cardbrother/nestjs-tencent-cloud-sdk">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/d18m/%40cardbrother%2Fnestjs-tencent-cloud-sdk"/>
  </a>
</p>
<p style="text-align:center;display:flex;justify-content:center;gap:5px;" align="center">
  <img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/main?logo=github&amp;logoColor=green&amp;color=%23FF40E0D0"/>
  <img alt="GitHub commit activity (branch)" src="https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/develop?logo=github&amp;logoColor=green&amp;label=Develop%20Commits&amp;color=%23FF40E0D0"/>
</p>

<p style="display:flex;padding: 3px 0; justify-content:center; align-items:center;" align="center">
  <strong style="width:200px;">🚨tencentcloud-sdk-nodejs 🚨cos-nodejs-sdk-v5</strong>
  <p align="center">
    <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/TencentCloud/tencentcloud-sdk-nodejs?color=slateblue&labelColor=red&label=version">
    <img alt="GitHub Tag" src="https://img.shields.io/github/v/tag/tencentyun/cos-nodejs-sdk-v5?color=slateblue&labelColor=red&label=version">
  </p>
  <p align="center"><strong>Language: <a href="README_ZH.md">中文</a></strong></p>
</p>

> tencentcloud-sdk-nodejs & cos-nodejs-sdk-v5 for NestJS developers

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

#### **Usage Tencent STS**

```ts
 const sts_client = await tencentCloudService.useClient(
      TencentCloudClientType.STS,
    );
    expect(sts_client).toBeDefined();
    expect(sts_client).toBeInstanceOf(StsProvider);
    const tempSignature = await sts_client.createTemporary({
      Name: 'Test',
      Policy: encodeURI(
        JSON.stringify({
          version: '2.0',
          statement: [
            {
              effect: 'allow',
              action: ['name/cos:PutObject'],
              resource: ['*'],
            },
          ],
        }),
      ),
      DurationSeconds: 1800,
    });



#### 📝 [CHANGELOG](CHANGELOG.md)

#### License [MIT](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/LICENSE)
```
