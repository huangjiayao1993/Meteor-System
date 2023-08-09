
/**
 * 上传实体
 */
export class UploadEntity {
  file: string | null
  objectKey: string | null
  businessId: string | null

  constructor(file = null, objectKey = null, businessId = null) {
    this.file = file
    this.objectKey = objectKey
    this.businessId = businessId
  }
}
