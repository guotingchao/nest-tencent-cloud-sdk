import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { StsProvider } from '../sts/sts.provider';
import { TencentCloudClientType } from '../tencent-cloud.interface';
import { TencentCloudModule } from '../tencent-cloud.module';
import { TencentCloudService } from '../tencent-cloud.service';

/**
 * @name @cardbrother/tencentCloudModule OCR Test
 * @description This test is end to end for the tencent ocr service
 */
describe('@cardbrother/tencentCloudModule STS Test', () => {
  let tencentCloudService: TencentCloudService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TencentCloudModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            const tencentSecretId =
              config.get<string>('TENCENT_API_ID') ||
              'XXXXXXXXXXXXXXXXXXXXXXXXX';
            const tencentSecretKey =
              config.get<string>('TENCENT_API_SECRET') ||
              'XXXXXXXXXXXXXXXXXXXXXXXXX';
            return {
              apiId: tencentSecretId,
              apiSecret: tencentSecretKey,
              region: 'ap-guangzhou',
              global: true,
            };
          },
          imports: [
            ConfigModule.forRoot({
              envFilePath: ['.env'],
            }),
          ],
          inject: [ConfigService],
        }),
      ],
    }).compile();

    tencentCloudService =
      moduleFixture.get<TencentCloudService>(TencentCloudService);
  });

  it('should be defined', () => {
    expect(tencentCloudService).toBeDefined();
  });

  it('should have the correct config', () => {
    const options = tencentCloudService.getOptions();
    expect(options).toBeDefined();
  });

  it('should have useClient STS Type', async () => {
    const sts_client = await tencentCloudService.useClient(
      TencentCloudClientType.STS,
    );
    expect(sts_client).toBeDefined();
    expect(sts_client).toBeInstanceOf(StsProvider);

    // const tempSignature = await sts_client.createTemporary({
    //   Name: 'CardBrother-App',
    //   Policy: encodeURI(
    //     JSON.stringify({
    //       version: '2.0',
    //       statement: [
    //         {
    //           effect: 'allow',
    //           action: ['cos:PutObject'],
    //           resource: ['*'],
    //         },
    //       ],
    //     }),
    //   ),
    //   DurationSeconds: 1800,
    // });

    // console.debug('🐛🐛🐛 --------------------------------------------🐛🐛🐛');
    // console.debug('🐛🐛🐛 ::: tempSignature:::', tempSignature);
    // console.debug('🐛🐛🐛 --------------------------------------------🐛🐛🐛');
  });
});
