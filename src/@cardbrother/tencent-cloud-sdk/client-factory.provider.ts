import { Injectable } from '@nestjs/common';

import { CosProvider } from './cos/cos.provider';
import { OcrProvider } from './ocr/ocr.provider';
import { SmsProvider } from './sms/sms.provider';
// assuming these imports are available
import {
  ClientTypeToClassMap,
  TencentCloudClientType,
} from './tencent-cloud.interface';

@Injectable()
export class ClientFactoryProvider {
  constructor(
    private readonly smsProvider: SmsProvider,
    private readonly ocrProvider: OcrProvider,
    private readonly cosProvider: CosProvider,
  ) {}

  public async createClient<
    T extends TencentCloudClientType | keyof typeof TencentCloudClientType,
  >(clientType: T): Promise<ClientTypeToClassMap[T]> {
    switch (clientType) {
      case 'SMS':
      case TencentCloudClientType.SMS:
        return this.smsProvider as ClientTypeToClassMap[T];
      case 'OCR':
      case TencentCloudClientType.OCR:
        return this.ocrProvider as ClientTypeToClassMap[T];
      case 'COS':
      case TencentCloudClientType.COS:
        return this.cosProvider as ClientTypeToClassMap[T];
      default:
        throw new Error('Unknown client type: ' + clientType);
    }
  }
}
