import { JSEncrypt } from 'jsencrypt'

const jsEncrypt = new JSEncrypt()

export const encrypt:string = (data) =>{
  jsEncrypt.setPublicKey(import.meta.env.VITE_RSA_PUBLIC_KEY)
  return jsEncrypt.encrypt(data)
}
