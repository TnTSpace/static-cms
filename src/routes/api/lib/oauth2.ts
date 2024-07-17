import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';
import { AuthorizationCode, type ModuleOptions } from 'simple-oauth2';

const create = (): AuthorizationCode => {
  const config: ModuleOptions = {
    client: {
      id: GITHUB_CLIENT_ID,
      secret: GITHUB_CLIENT_SECRET,
    },
    auth: {
      tokenHost: 'https://github.com',
      tokenPath: '/login/oauth/access_token',
      authorizePath: '/login/oauth/authorize',
    },
  };

  return new AuthorizationCode(config);
};

const renderBody = (status: string, content: Record<string, any>): string => `
<script>
  const receiveMessage = (message) => {
    window.opener.postMessage(
      'authorization:github:${status}:${JSON.stringify(content)}',
      message.origin
    );

    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  
  window.opener.postMessage("authorizing:github", "*");
</script>
`;

export { create, renderBody };
