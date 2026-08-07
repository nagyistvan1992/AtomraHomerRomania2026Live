// Native Vercel REST API Client

const functionRouteMap: Record<string, string> = {
  'stripe-checkout': 'checkout',
  'stripe-webhook': 'webhook',
  'get-session-details': 'session-details',
  'create-payment-intent': 'payment-intent',
  'send-order-emails': 'emails',
  'send-order-notification': 'emails',
  'send-order-status-email': 'emails',
};

const tableRouteMap: Record<string, string> = {
  products: 'products',
  product_categories: 'categories',
  categories: 'categories',
  orders: 'orders',
  customers: 'customers',
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
    onAuthStateChange: (callback: any) => {
      const token = typeof localStorage !== 'undefined' ? localStorage.getItem('atomra_admin_token') : null;
      if (token) {
        callback('SIGNED_IN', { access_token: token });
      }
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
  from: (tableName: string) => {
    const route = tableRouteMap[tableName] || tableName;
    const baseUrl = `${getApiBaseUrl()}/api/${route}`;

    const executeFetch = async (url: string, method = 'GET', body?: any) => {
      try {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        const token = typeof localStorage !== 'undefined' ? localStorage.getItem('atomra_admin_token') : null;
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
          const errText = await res.text();
          let errObj = { message: `Request failed with status ${res.status}` };
          try {
            errObj = JSON.parse(errText);
          } catch {}
          return { data: null, error: errObj };
        }

        const json = await res.json();
        return { data: json, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message || 'Network error' } };
      }
    };

    return {
      select: (columns = '*') => {
        let filterEq: { field: string; val: any } | null = null;
        let isSingle = false;

        const queryObj = {
          eq: (field: string, val: any) => {
            filterEq = { field, val };
            return queryObj;
          },
          order: (field: string, opts?: any) => queryObj,
          single: () => {
            isSingle = true;
            return queryObj;
          },
          maybeSingle: () => {
            isSingle = true;
            return queryObj;
          },
          then: (onfulfilled: any, onrejected?: any) => {
            const url = filterEq ? `${baseUrl}?${filterEq.field}=${encodeURIComponent(filterEq.val)}` : baseUrl;
            return executeFetch(url, 'GET').then((res) => {
              if (isSingle && Array.isArray(res.data)) {
                res.data = res.data[0] || null;
              }
              return onfulfilled ? onfulfilled(res) : res;
            }, onrejected);
          },
        };

        return queryObj;
      },
      insert: async (rows: any[]) => {
        const payload = Array.isArray(rows) ? rows[0] : rows;
        const res = await executeFetch(baseUrl, 'POST', payload);
        if (res.data) {
          return { data: Array.isArray(res.data) ? res.data : [res.data], error: null };
        }
        return res;
      },
      update: (data: any) => ({
        eq: async (field: string, val: any) => {
          return executeFetch(baseUrl, 'PUT', { [field]: val, ...data });
        },
      }),
      delete: () => ({
        eq: async (field: string, val: any) => {
          return executeFetch(`${baseUrl}?${field}=${encodeURIComponent(val)}`, 'DELETE');
        },
      }),
    };
  },
  storage: {
    from: (bucket: string) => ({
      upload: async (path: string, file: File) => {
        try {
          const res = await fetch(`/api/upload?filename=${encodeURIComponent(path)}`, {
            method: 'POST',
            body: file,
          });
          const json = await res.json();
          return { data: { path: json.url }, error: json.error ? { message: json.error } : null };
        } catch (err: any) {
          return { data: null, error: { message: err.message || 'Upload failed' } };
        }
      },
      getPublicUrl: (path: string) => ({ data: { publicUrl: path } }),
    }),
  },
};

export const apiClient = vercelApiClient;

