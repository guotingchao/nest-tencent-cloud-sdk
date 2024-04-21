import { Injectable } from '@nestjs/common';

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
      default:
        throw new Error('Unknown client type: ' + clientType);
    }
  }
}
