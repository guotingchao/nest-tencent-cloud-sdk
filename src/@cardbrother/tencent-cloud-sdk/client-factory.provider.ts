import { Injectable } from '@nestjs/common';

import { OcrProvider } from './ocr/ocr.provider';
import { SmsProvider } from './sms/sms.provider';
// assuming these imports are available
import {
  EClientType,
  TencentCloudAbstructClient,
} from './tencent-cloud.interface';

@Injectable()
export class ClientFactoryProvider {
  constructor(
    private readonly smsProvider: SmsProvider,
    private readonly ocrProvider: OcrProvider,
  ) {}

  async createClient(
    clientType: EClientType,
  ): Promise<TencentCloudAbstructClient> {
    switch (clientType) {
      case EClientType.SMS:
        return this.smsProvider;
      case EClientType.OCR:
        return this.ocrProvider;
      default:
        throw new Error('Unknown client type: ' + clientType);
    }
  }
}
