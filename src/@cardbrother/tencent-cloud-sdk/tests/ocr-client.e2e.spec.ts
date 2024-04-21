import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { OcrProvider } from '../ocr/ocr.provider';
import { TencentCloudClientType } from '../tencent-cloud.interface';
import { TencentCloudModule } from '../tencent-cloud.module';
import { TencentCloudService } from '../tencent-cloud.service';

/**
 * @name @cardbrother/tencentCloudModule OCR Test
 * @description This test is end to end for the tencent ocr service
 */
describe('@cardbrother/tencentCloudModule OCR Test', () => {
  let tencentCloudService: TencentCloudService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TencentCloudModule.forRootAsync({
          useFactory: (config: ConfigService) => {
            const tencentSecretId = config.get('tencent_secretId');
            const tencentSecretKey = config.get('tencent_secretKey');
            return {
              apiId: tencentSecretId,
              apiSecret: tencentSecretKey,
              region: 'ap-guangzhou',
              global: true,
            };
          },
          imports: [ConfigModule.forRoot()],
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

  it('should have useClient OCR Type', async () => {
    const ocr_client = await tencentCloudService.useClient(
      TencentCloudClientType.OCR,
    );
    expect(ocr_client).toBeDefined();
    expect(ocr_client).toEqual(expect.any(OcrProvider));
    expect(ocr_client).toBeInstanceOf(OcrProvider);
    const res = await ocr_client.generalOcr({
      ImageUrl:
        'https://bkimg.cdn.bcebos.com/pic/242dd42a2834349b008317b9ccea15ce36d3be00?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080',
    });
    console.debug('🐛🐛🐛 ------------------------🐛🐛🐛');
    console.debug('🐛🐛🐛 ::: res:::', res);
    console.debug('🐛🐛🐛 ------------------------🐛🐛🐛');
    expect(res).toBeDefined();
  });
});
