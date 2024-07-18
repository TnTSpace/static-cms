import { json, redirect } from '@sveltejs/kit';
import { create } from '../lib/oauth2';
import type { RequestHandler } from './$types'; 
import { renderBody } from '$lib/oauth2';

export const GET: RequestHandler = async ({ request, url }) => {
  const code = url.searchParams.get('code') as string
  const oauth2 = create()

  try {
    const { token } = await oauth2.getToken({
      code,
      redirect_uri: `https://static-cms.vercel.app/api/callback`,
      scope: `repo,user,workflow`
    })

    console.log(JSON.stringify(token.access_token))
  
    return new Response(renderBody('success', {
      token: token.access_token,
      provider: 'github'
    }), { headers: {'Content-Type': 'text/html'} })
  } catch (error: any) {
    return new Response(renderBody('error', error), { headers: { 'Content-Type': 'text/html' } });
  }
};