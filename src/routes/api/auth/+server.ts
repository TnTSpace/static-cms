import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '../lib/oauth2';

 
const randomString = () => crypto.randomUUID()

export const GET: RequestHandler = async ({ request }) => {
  const host = request.headers.get('host') as string

  const oauth2 = create()

  const authorizationUri = oauth2.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString()
  })

  redirect(301, authorizationUri)

  return new Response();
};