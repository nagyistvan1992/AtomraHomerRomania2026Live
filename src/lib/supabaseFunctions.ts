import { isSupabaseConfigured, supabase } from './supabase';

const supabaseFunctionsBaseUrl = import.meta.env.VITE_SUPABASE_URL
  ? `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`
  : '';

const supabasePublishableKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

interface InvokeSupabaseFunctionOptions {
  body?: unknown;
  method?: 'POST' | 'GET';
  requireSession?: boolean;
  timeoutMs?: number;
}

const getSupabaseFunctionHeaders = async (requireSession = false) => {
  if (!isSupabaseConfigured || !supabaseFunctionsBaseUrl || !supabasePublishableKey) {
    throw new Error('Supabase functions are not configured.');
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: supabasePublishableKey,
  };

  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    console.warn('Unable to read Supabase session before function call:', sessionError.message);
  }

  const accessToken = sessionData?.session?.access_token?.trim();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  } else if (requireSession) {
    throw new Error('A signed-in session is required for this action.');
  }

  return headers;
};

export const invokeSupabaseFunction = async <T>(
  functionName: string,
  options: InvokeSupabaseFunctionOptions = {},
): Promise<T> => {
  const {
    body,
    method = 'POST',
    requireSession = false,
    timeoutMs = 15000,
  } = options;

  const headers = await getSupabaseFunctionHeaders(requireSession);
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${supabaseFunctionsBaseUrl}/${functionName}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    const rawBody = await response.text();
    let parsedBody: unknown = null;

    if (rawBody) {
      try {
        parsedBody = JSON.parse(rawBody);
      } catch {
        parsedBody = { message: rawBody };
      }
    }

    if (!response.ok) {
      const errorMessage =
        typeof parsedBody === 'object' && parsedBody !== null
          ? (parsedBody as { error?: string; message?: string }).error ??
            (parsedBody as { error?: string; message?: string }).message
          : null;

      throw new Error(
        errorMessage || `Supabase function "${functionName}" failed with status ${response.status}.`,
      );
    }

    return parsedBody as T;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Supabase function "${functionName}" timed out.`);
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
};
