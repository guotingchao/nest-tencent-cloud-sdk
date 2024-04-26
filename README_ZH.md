<h1 align="center">@cardbrother/nestjs-tencent-cloud-sdk</h1>

[![CI](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Test.yml) [![Release & Publish](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/Release.yml) [![package version](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk.svg)](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk) ![NPM Downloads](https://img.shields.io/npm/d18m/%40cardbrother%2Fnestjs-tencent-cloud-sdk) ![GitHub language count](https://img.shields.io/github/languages/count/guotingchao/nest-tencent-cloud-sdk?color=green)![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/main?logo=github&logoColor=green&color=%23FF40E0D0)
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/t/guotingchao/nest-tencent-cloud-sdk/develop?logo=github&logoColor=green&label=Develop%20Commits&color=%23FF40E0D0)

> Tencent Cloud SDK for NestJS Developers

### Installation

```bash
npm install @cardbrother/nest-tencent-cloud-sdk
```

---

- Use pnpm or bun
- Zero config
- support all Tencent Cloud API
- supoort latest version of Tencent Cloud API

### Installation

- npm

```bash
$ npm install @cardbrother/nest-tencent-cloud-sdk
```

- yarn

```bash
$ yarn add @cardbrother/nest-tencent-cloud-sdk
```

- pnpm 🚀 **Recommended**

```bash
$ pnpm add @cardbrother/nest-tencent-cloud-sdk
```

### Usage

##### TencentCloud SDK

```ts
import { Module } from '@nestjs/common';
import { TencentCloudModule } from '@cardbrother/nest-tencent-cloud-sdk';

@Module({
  imports: [
    TencentCloudModule.forRoot({
      secretId: 'your secretId',
      secretKey,
      global: true, // false by default
    }),
  ],
})
export class AppModule {}
```

###### TencentCloud COS SDK

```ts

```

### [CHANGELOG](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/CHANGELOG.md)

### License [MIT](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/LICENSE)
