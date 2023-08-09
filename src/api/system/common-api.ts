import request from '@/api';
import {UploadEntity} from "@/api/interface/system/common";

export default {
  /**
   * 上传
   */
  upload: (data: UploadEntity) => request.UPLOAD('/common/upload', data),
}
