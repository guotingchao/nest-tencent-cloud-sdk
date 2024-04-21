import {
  GeneralEfficientOCRRequest,
  GeneralEfficientOCRResponse,
  GeneralFastOCRRequest,
  GeneralFastOCRResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/ocr/v20181119/ocr_models';
export interface IOcrProvider {
  /**
   * @name generalOcr
   * @description 通用印刷体识别（高效版） 通用印刷体识别（高效版）识别图片中的文字内容，并返回文字内容及文字在图片中的位置信息。
   * @param params  GeneralEfficientOCRRequest
   * @returns GeneralEfficientOCRResponse
   */
  generalOcr: (
    params: GeneralEfficientOCRRequest,
  ) => Promise<GeneralEfficientOCRResponse>;

  /**
   * @name fastOcr
   * @description 通用印刷体识别（高速版） 通用印刷体识别（高速版）识别图片中的文字内容，并返回文字内容及文字在图片中的位置信息。
   * @param params  GeneralFastOCRRequest
   * @returns GeneralFastOCRResponse
   */
  fastOcr: (params: GeneralFastOCRRequest) => Promise<GeneralFastOCRResponse>;
}
