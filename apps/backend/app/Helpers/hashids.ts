import Env from '@ioc:Adonis/Core/Env'
import Hashids from 'hashids'

export default class HashIDs {
  public static encode(val: number) {
    if (process.env.NODE_ENV === 'development') {
      return `${val}`
    }
    const hids = new Hashids(Env.get('APP_KEY'), 20)
    return hids.encode(val)
  }

  public static decode(val: string) {
    if (process.env.NODE_ENV === 'development') {
      return Number(val)
    }

    const hids = new Hashids(Env.get('APP_KEY'), 20)
    return Number(hids.decode(val)[0])
  }
}
