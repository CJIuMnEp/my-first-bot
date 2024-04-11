import { Bot } from 'grammy'

const bot = new Bot('6757994311:AAFVF-stXiJc3bTVcs0unay6oQ_1E7Av6xY')

const messages = new Map()

function makeMessage(text, role = 'assistant') {
  return {
    role: role,
    content: text,
  }
}

async function send(text, messages) {
  return fetch('https://gpt4free.io/wp-json/mwai-ui/v1/chats/submit', {
    headers: {
      accept: 'text/event-stream',
      'accept-language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      'sec-ch-ua':
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-wp-nonce': '3bf6a67690',
      cookie:
        '_ga=GA1.1.139806129.1712767495; ezosuibasgeneris-1=a0e6e380-aec4-4e4e-6a69-56eec62eedd6; ezds=ffid%3D1%2Cw%3D1463%2Ch%3D915; tk_or=%22%22; tk_r3d=%22%22; tk_lr=%22%22; sbjs_migrations=1418474375998%3D1; sbjs_current_add=fd%3D2024-04-11%2018%3A15%3A37%7C%7C%7Cep%3Dhttps%3A%2F%2Fgpt4free.io%2Fchat%2F%7C%7C%7Crf%3D%28none%29; sbjs_first_add=fd%3D2024-04-11%2018%3A15%3A37%7C%7C%7Cep%3Dhttps%3A%2F%2Fgpt4free.io%2Fchat%2F%7C%7C%7Crf%3D%28none%29; sbjs_current=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29; sbjs_first=typ%3Dtypein%7C%7C%7Csrc%3D%28direct%29%7C%7C%7Cmdm%3D%28none%29%7C%7C%7Ccmp%3D%28none%29%7C%7C%7Ccnt%3D%28none%29%7C%7C%7Ctrm%3D%28none%29%7C%7C%7Cid%3D%28none%29; sbjs_udata=vst%3D1%7C%7C%7Cuip%3D%28none%29%7C%7C%7Cuag%3DMozilla%2F5.0%20%28Windows%20NT%2010.0%3B%20Win64%3B%20x64%29%20AppleWebKit%2F537.36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F123.0.0.0%20Safari%2F537.36; ezoab_529392=mod41; ezoadgid_529392=-1; ezoref_529392=; lp_529392=https://gpt4free.io/chat/; ezovuuid_529392=f28d84d8-9445-40cb-57dd-971046f3fa2c; burst_uid=37c4821038b56c77cc7edebb37affd44; sbjs_session=pgs%3D2%7C%7C%7Ccpg%3Dhttps%3A%2F%2Fgpt4free.io%2Fchat%2F; _ga_RZL5TC0GKV=GS1.1.1712859337.3.1.1712860686.0.0.0; ezopvc_529392=2; ezovuuidtime_529392=1712860685; active_template::529392=orig_site.1712860685; ezohw=w%3D1463%2Ch%3D230',
      Referer: 'https://gpt4free.io/chat/',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    body: JSON.stringify({
      botId: 'default',
      customId: null,
      session: 'N/A',
      chatId: 'kd7dd44mx2',
      contextId: 1781,
      // messages: [
      //   {
      //     id: '6fxu8zps51d',
      //     role: 'assistant',
      //     content: 'How can I help you today?',
      //     who: 'AI: ',
      //     timestamp: 1712860686410,
      //   },
      // ],
      messages,
      newMessage: text,
      newFileId: null,
      stream: false,
    }),
    method: 'POST',
  })
    .then((res) => res.json())
    .then((res) => res.reply)
}

bot.on('message', async (ctx) => {
  const text = ctx.message.text
  const userId = ctx.from.id
  const userMessages = messages.get(userId)?.slice(0, 10) || []
  const reply = await send(text, userMessages)

  messages.set(
    userId,
    userMessages
      .concat(makeMessage(text, 'user'))
      .concat(makeMessage(reply, 'assistant'))
  )

  ctx.reply(reply)
})

bot.start()
