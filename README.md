# @cardbrother/nestjs-tencent-cloud-sdk

---

[![Release](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/CI.yml/badge.svg)](https://github.com/guotingchao/nest-tencent-cloud-sdk/actions/workflows/CI.yml)

[![package version](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk.svg)](https://badge.fury.io/js/@cardbrother%2Fnestjs-tencent-cloud-sdk)

### Description

---

> Tencent Cloud SDK for NestJS Developers

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

_comming soon_

### [CHANGELOG](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/CHANGELOG.md)

### License [MIT](https://github.com/guotingchao/nest-tencent-cloud-sdk/blob/main/LICENSE)
