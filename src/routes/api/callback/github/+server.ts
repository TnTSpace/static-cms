// src/routes/api/callback/[provider].js
import { json } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = async ({ url }) => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const provider = url.searchParams.get('provider')
  const client_id = GITHUB_CLIENT_ID;
  const client_secret = GITHUB_CLIENT_SECRET;
  const redirect_uri = 'https://static-cms.vercel.app/api/callback/github';

  if (provider === 'github' && code) {
    try {
      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
          redirect_uri,
          state
        })
      });

      const data = await response.json();

      if (data.access_token) {
        return json({
          status: 'success',
          token: data.access_token,
          provider
        });
      } else {
        return json({
          status: 'error',
          message: 'Failed to authenticate with GitHub.'
        }, { status: 400 });
      }
    } catch (error) {
      return json({
        status: 'error',
        message: 'Internal Server Error'
      }, { status: 500 });
    }
  } else {
    return json({
      status: 'error',
      message: 'Invalid provider or missing code parameter'
    }, { status: 400 });
  }
};
