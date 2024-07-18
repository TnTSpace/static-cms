import { json, redirect } from '@sveltejs/kit';
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
      redirect_uri: `https://static-cms.vercel.app/api/callback`,
      scope: `repo,user`
    })

    console.log(JSON.stringify(token.access_token))
  
    return redirect(302, `https://static-cms.vercel.app/admin?token=${token.access_token}&provider=github`);
  } catch (e: any) {
    return json({ error: 'Authentication failed', details: e }, { status: 500 });
  }
};