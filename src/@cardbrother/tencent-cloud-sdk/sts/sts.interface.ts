import {
  GetFederationTokenRequest,
  GetFederationTokenResponse,
  QueryApiKeyRequest,
  QueryApiKeyResponse,
} from 'tencentcloud-sdk-nodejs/tencentcloud/services/sts/v20180813/sts_models';

export interface IStsProvider {
  /**
   * @name 获取临时凭证签名
   * @description 获取临时访问凭证 具体文档参考 https://cloud.tencent.com/document/product/1312/48195
   * @param params  GetFederationTokenRequest - 生成临时访问凭证参数
   * @returns GetFederationTokenResponse - 返回临时访问凭证结果
   */
  createTemporary: (
    params: GetFederationTokenRequest,
  ) => Promise<GetFederationTokenResponse>;

  /**
   * @name 查询API密钥
   * @description 查询API密钥 具体文档参考 https://cloud.tencent.com/document/product/1312/48194
   * @param params  QueryApiKeyRequest - 查询API密钥参数
   * @returns UploadFileResult - 返回查询API密钥结果
   */
  queryApiKey: (params: QueryApiKeyRequest) => Promise<QueryApiKeyResponse>;
}
