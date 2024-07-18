import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { create } from '../lib/oauth2'; 
import { GITHUB_CLIENT_ID } from '$env/static/private';

 
const randomString = () => crypto.randomUUID()

export const GET: RequestHandler = async ({ request }) => {

  const oauth2 = create()

  const authorizationUri = oauth2.authorizeURL({
    redirect_uri: `https://static-cms.vercel.app/api/callback`,
    scope: `repo`,
    state: randomString(),
    client_id: GITHUB_CLIENT_ID
  })

  return new Response('', {
    status: 301,
    headers: {
      Location: authorizationUri
    }
  });
};