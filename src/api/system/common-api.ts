import request from '@/api';
import {UploadEntity} from "@/api/interface/system/common";

export default {
  /**
   * 获取app应用相关信息
   */
  appInfo: () => request.GET('/common/app/info'),
  /**
   * 上传
   */
  upload: (data: UploadEntity) => request.UPLOAD('/common/upload', data),
}
