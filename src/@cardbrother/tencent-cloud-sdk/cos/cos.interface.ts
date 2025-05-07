import type {
  DownloadFileParams,
  DownloadFileResult,
  GetBucketParams,
  GetBucketResult,
  GetObjectUrlParams,
  GetObjectUrlResult,
  UploadFileParams,
  UploadFileResult,
} from 'cos-nodejs-sdk-v5';
import * as COS from 'cos-nodejs-sdk-v5';

import type { TencentCloudModuleOptions } from '../tencent-cloud.interface';
export interface ICosProvider {
  /**
   * @name 上传文件
   * @description 高级上传 具体文档参考 https://cloud.tencent.com/document/product/436/64980
   * @param params  UploadFileParams - 上传参数
   * @returns UploadFileResult - 上传结果
   */
  upload: (params: UploadFileParams) => Promise<UploadFileResult>;

  /**
   * @name 下载文件
   * @description 下载文件 具体文档参考 https://cloud.tencent.com/document/product/436/64981
   * @param params GetObjectParams - 下载参数
   * @returns GetObjectResult - 下载结果
   */
  download(params: DownloadFileParams): Promise<DownloadFileResult>;

  /**
   * @name 获取文件列表
   * @description 获取文件列表 具体文档参考 https://cloud.tencent.com/document/product/436/64982
   * @param params GetBucketParams - 获取文件列表参数
   * @returns GetBucketResult - 获取文件列表结果
   */
  fetchList(params: GetBucketParams): Promise<GetBucketResult>;

  /**
   * @name getAuthorization
   * @description 生成预签名链接 具体文档参考 https://cloud.tencent.com/document/product/436/36121
   * @param {params}  StaticGetAuthorizationOptions - Cos配置
   * @returns Authorization - 签名对象
   */
  getAuthorization(options: COS.StaticGetAuthorizationOptions): Promise<string>;

  /**
   * @name GetDownloadUrl
   * @description 获取下载链接
   * @param {options}  - GetObjectUrlParams 获取下载链接参数
   * @returns {Promise<GetObjectUrlResult>} - GetObjectUrlResult 获取下载链接结果
   */
  getDownloadUrl(options: GetObjectUrlParams): Promise<GetObjectUrlResult>;
}

/**
 * @name CosAbstructClient
 * @description Cos抽象类
 */
export class CosAbstructClient {
  public readonly baseCosOption: COS.COSOptions;
  protected readonly cosInstance: COS;
  constructor(options: TencentCloudModuleOptions) {
    if (!options.cos) {
      throw new Error('cos options is not defined in Module initlization');
    }
    this.baseCosOption = options.cos;
    if (this.baseCosOption) {
      this.cosInstance = new COS({
        ...this.baseCosOption,
      });
    } else console.warn('cos options is not defined in Module initlization');
  }
}
