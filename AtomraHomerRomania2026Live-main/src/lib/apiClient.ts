// Vercel Native API Client replacing Supabase Client

const functionRouteMap: Record<string, string> = {
  'stripe-checkout': 'checkout',
  'stripe-webhook': 'webhook',
  'get-session-details': 'session-details',
  'create-payment-intent': 'payment-intent',
  'send-order-emails': 'emails',
  'send-order-notification': 'emails',
  'send-order-status-email': 'emails',
};

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

export const invokeVercelFunction = async <T = any>(
  functionName: string,
  options: { body?: any; headers?: Record<string, string>; method?: string } = {}
): Promise<T> => {
  const route = functionRouteMap[functionName] || functionName.replace(/^\//, '');
  const url = `${getApiBaseUrl()}/api/${route}`;

  const response = await fetch(url, {
    method: options.method || 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API call /api/${route} failed with status ${response.status}`;
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.error) errorMessage = errorJson.error;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json();
};

export const invokeSupabaseFunction = invokeVercelFunction;

export const vercelApiClient = {
  auth: {
    getSession: async () => {
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('atomra_admin_token') : null;
      return {
        data: { session: token ? { access_token: token } : null },
        error: null,
      };
    },
    signInWithPassword: async ({ password, email }: { password?: string; email?: string }) => {
      try {
        const res = await invokeVercelFunction('admin/auth', {
          body: { password, email },
        });
        if (res.token) {
          localStorage.setItem('atomra_admin_token', res.token);
          return { data: { session: { access_token: res.token }, user: res.user }, error: null };
        }
        return { data: null, error: { message: res.error || 'Authentication failed' } };
      } catch (err: any) {
        return { data: null, error: { message: err.message || 'Login failed' } };
      }
    },
    signOut: async () => {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('atomra_admin_token');
      return { error: null };
    },
  },
  from: (tableName: string) => ({
    select: (columns = '*') => ({
      order: (field: string, opts?: any) => ({
        data: [],
        error: null,
      }),
      eq: (field: string, val: any) => ({
        single: async () => ({ data: null, error: null }),
        data: [],
        error: null,
      }),
      insert: async (rows: any[]) => ({ data: rows, error: null }),
      update: async (row: any) => ({ data: row, error: null }),
      delete: async () => ({ error: null }),
    }),
    insert: async (rows: any[]) => ({ data: rows, error: null }),
  }),
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        const res = await fetch(`/api/upload?filename=${encodeURIComponent(path)}`, {
          method: 'POST',
          body: file,
        });
        const json = await res.json();
        return { data: { path: json.url }, error: json.error ? { message: json.error } : null };
      },
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
  },
};

export const isSupabaseConfigured = true;
export const supabase = vercelApiClient;
