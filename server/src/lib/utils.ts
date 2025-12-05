import type { Context } from 'hono'
import z from "zod"

export const chatbot_message = z.object({
  role:z.enum(["user","assistant"]),
  content:z.string().nonempty()
})

export const chatbot_request = z.object({
  messages: z.array(chatbot_message)
})

export const get_client_ip = (c: Context): string => {
    const headers = c.req.raw.headers

    const ip_cf = headers.get('cf-connecting-ip')
    if (ip_cf) return ip_cf

    const ip_real = headers.get('x-real-ip')
    if (ip_real) return ip_real

    const xff = headers.get('x-forwarded-for')
    if (xff) {
        const ip_xff = xff.split(',')[0]?.trim()
        if (ip_xff) return ip_xff
    }

    return '127.0.0.1'
}

export function validate_coords(lat_param: string, lon_param: string) {
  const lat = parseFloat(lat_param)
  const lon = parseFloat(lon_param)

  if (
    isNaN(lat) || isNaN(lon) ||
    lat < -90 || lat > 90 ||
    lon < -180 || lon > 180
  ) {
    return { valid: false, message: "Paramètres 'lat' ou 'lon' invalides." }
  }

  return { valid: true, lat, lon }
}

