import { json, redirect } from '@sveltejs/kit';
import { create, renderBody } from '../lib/oauth2';
import type { RequestHandler } from './$types';
import { HOST } from '$env/static/private';

export const GET: RequestHandler = async ({ request, url }) => {
  const code = url.searchParams.get('code') as string
  // const host = request.headers.get('host')

  const oauth2 = create()

  try {
    const accessToken = await oauth2.getToken({
      code,
      redirect_uri: `${HOST}/api/callback`,
      scope: `repo,user`
    })
  
    return redirect(302, `${HOST}/admin?token=${accessToken}&provider=github`);
  } catch (e: any) {
    return json({ error: 'Authentication failed', details: e }, { status: 500 });
  }
};