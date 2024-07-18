<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  let token: string;
  let provider: string;

  $: {
    const params = new URLSearchParams(window.location.search);
    token = params.get('access_token') || '';
    provider = params.get('provider') || '';
  }

  onMount(() => {
    if (token && provider) {
      // Pass the token to the opener window
      window.opener?.postMessage(
        `authorization:${provider}:success:${JSON.stringify({ token })}`,
        '*'
      );
      window.close();
    } else {
      // Handle error case
      window.opener?.postMessage('authorization:github:error', '*');
      window.close();
    }
  });
</script>