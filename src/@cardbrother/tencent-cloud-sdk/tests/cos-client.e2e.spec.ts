import { Test, TestingModule } from '@nestjs/testing';

import { CosProvider } from '../cos/cos.provider';
import { TencentCloudModule } from '../tencent-cloud.module';
import { TencentCloudService } from '../tencent-cloud.service';

/**
 * @name @cardbrother/tencentCloudModule Test
 * @description This test is end to end for the tencent sms service
 */
describe('@cardbrother/tencentCloudModule COS Test', () => {
  let tencentCloudService: TencentCloudService;
  const tencent_cos_secretId = 'XXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXX';
  const tencent_cos_secretKey = 'XXXXXXXXXXXXX-XXXXXXXXXXXXXXXX';
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TencentCloudModule.forRoot({
          cos: {
            SecretId: tencent_cos_secretId,
            SecretKey: tencent_cos_secretKey,
            Region: 'eu-frankfurt',
          },
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

  it('should have useClient Cos Type', async () => {
    const cosClient = await tencentCloudService.useClient('COS');
    expect(cosClient).toBeDefined();
    expect(cosClient).toEqual(expect.any(CosProvider));
    const testOrignalPictureSource =
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
    const sign = await cosClient.getAuthorization({
      Method: 'GET',
      Key: testOrignalPictureSource,
      Region: 'api-guangzhou',
      Expires: 900, // 900 seconds
    });

    const imgUrl = await cosClient.getDownloadUrl({
      Bucket: 'test-1250000000',
      Key: testOrignalPictureSource,
      Region: 'api-guangzhou',
      Sign: true,
    });

    console.debug('🐛🐛🐛 --------------------------------------------🐛🐛🐛');
    console.debug(
      'IMG URL: %s',
      imgUrl.Url +
        (imgUrl.Url.indexOf('?') > -1 ? '&' : '?') +
        'response-content-disposition=inline',
    );
    console.debug(
      '🐛🐛🐛 ::: Sign Url:::',
      testOrignalPictureSource + `?${sign}&response-content-disposition=inline`,
    );
    console.debug('🐛🐛🐛 --------------------------------------------🐛🐛🐛');

    expect(imgUrl).not.toBeNull();
  });
});
