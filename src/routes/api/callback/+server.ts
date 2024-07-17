import { json } from '@sveltejs/kit';
import { create, renderBody } from '../lib/oauth2';
import type { RequestHandler } from './$types';
import { HOST } from '$env/static/private';

export const GET: RequestHandler = async ({ request, url }) => {
  const code = url.searchParams.get('code') as string
  // const host = request.headers.get('host')

  const oauth2 = create()

  try {
    const { token } = await oauth2.getToken({
      code,
      redirect_uri: `https://${HOST}/api/callback`,
      scope: `repo,user`
    })
  
    return json(renderBody("success", {
      token: token.access_token,
      provider: "github"
    }))
  } catch (error: any) {
    return json(renderBody("error", error))
  }
};