import { Test, TestingModule } from '@nestjs/testing';

import { SmsProvider } from '../sms/sms.provider';
import { TencentCloudModule } from '../tencent-cloud.module';
import { TencentCloudService } from '../tencent-cloud.service';

/**
 * @name @cardbrother/tencentCloudModule Test
 * @description This test is end to end for the tencent sms service
 */
describe('@cardbrother/tencentCloudModule SMS Test', () => {
  let tencentCloudService: TencentCloudService;
  const tencent_secretId = '';
  const tencent_secretKey = '';
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TencentCloudModule.forRoot({
          apiId: tencent_secretId,
          apiSecret: tencent_secretKey,
          region: 'ap-guangzhou',
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

  it('should have useClient Sms Type', async () => {
    const sms_client = await tencentCloudService.useClient('SMS');
    expect(sms_client).toBeDefined();
    expect(sms_client).toEqual(expect.any(SmsProvider));
    // const res = await sms_client.send({
    //   PhoneNumberSet: ['13711112222'],
    //   TemplateId: '',
    //   SignName: '',
    //   TemplateParamSet: [''],
    //   SmsSdkAppId: '',
    // });
    // expect(sms_client).toBeInstanceOf(SmsProvider);
    // expect(res).toBeDefined();
  });
});
