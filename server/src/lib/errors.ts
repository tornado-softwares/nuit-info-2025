import type { Context } from "hono"

export function not_found(c: Context) {
  return c.json({
    'error': {
      'code':  404,
      'message': 'Not found.',
      'type': "not_found",
      'ref': "https://httpproblems.com/http-status/404"
    }
  }, 404)
}

const rate_messages = [
  "Vous cliquez plus vite que votre ombre !",
  "Eh là, pas si vite, cowboy !",
  "Même les robots ont besoin d'une pause café.",
  "Patience est mère de toutes les vertus... et des serveurs contents.",
  "Wow, doucement ! Mon processeur commence à chauffer.",
  "Je ne suis pas un supercalculateur, vous savez.",
  "Les bonnes choses viennent à ceux qui attendent.",
  "Trop de demandes ! Un peu de repos s'impose.",
  "Qui va lentement va sûrement... et sans erreurs 429.",
  "Je suis flatté par tant d'attention, mais un peu de modération, s'il vous plaît.",
  "Mon hamster dans la roue a besoin de reprendre son souffle.",
  "Oups, vous avez cassé le bouton refresh ?",
  "Un moment, j'installe le turbo.",
  "La surchauffe menace ! Merci de ralentir.",
  "Même les serveurs ont besoin de vacances.",
  "Je vois que vous êtes impatient, mais moi je suis un peu fatigué.",
  "Pas si vite ! Je n'ai que deux mains électroniques.",
  "Vous me faites tourner la tête avec toutes ces requêtes.",
  "Attention, trop de clics peuvent causer des étincelles !",
  "C'est pas Versailles ici, économisez les requêtes.",
  "Vous avez réveillé le gardien des taux, il vous demande de ralentir.",
  "Trop de zèle peut nuire à la santé... du serveur.",
  "Si vous continuez à cliquer, je vais finir par rougir.",
  "Une pause s'impose, non ?",
  "Même les machines ont besoin de respirer un peu.",
  "Allons, un peu de patience, je fais de mon mieux !",
  "Vous êtes sur le point de battre le record de clics par minute.",
  "Je vois que vous aimez cliquer, mais pensez à moi.",
  "Lentement mais sûrement, c'est le chemin de la sagesse.",
  "Doucement, on n'est pas pressé !",
  "Oh là là, trop de requêtes !",
  "Hé, ce n'est pas une course de vitesse !",
  "Un à la fois, s'il vous plaît !",
  "Calmez-vous, je ne vais pas m'enfuir !",
]

export function rate_limited(c: Context) {
  return c.json({
    'error':
    {
      'code':  429,
      'message': `${rate_messages[Math.floor(Math.random() * rate_messages.length)]}`,
      'type': 'rate_limited',
      'ref': "https://httpproblems.com/http-status/429"
    }
  },429)
}

export function bad_request(c: Context, message: string) {
  return c.json({
    'error': {
      'code':  400,
      'message': message,
      'type': "bad_request",
      'ref': "https://httpproblems.com/http-status/400"
    }
  }, 400)
}

export function internal_error(c: Context, message: string) {
  return c.json({
    'error': {
      'code':  500,
      'message': message,
      'type': "internal_error",
      'ref': "https://httpproblems.com/http-status/500"
    }
  }, 500)
}

export function bad_gateway(c: Context, message: string) {
  return c.json({
    'error': {
      'code':  502,
      'message': message,
      'type': "bad_gateway",
      'ref': "https://httpproblems.com/http-status/502"
    }
  }, 502)
}