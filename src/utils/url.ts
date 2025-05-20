
/**
 * Builds a URL with query parameters
 * @param baseUrl - The base URL
 * @param params - Object containing query parameters
 * @returns Full URL with query parameters
 */
export const buildUrl = (baseUrl: string, params: Record<string, string | number>): string => {
  const url = new URL(baseUrl, window.location.origin);
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value.toString());
    }
  });
  
  return url.toString();
};

/**
 * Extracts query parameters from a URL
 * @returns Object containing all query parameters
 */
export const getQueryParams = (): Record<string, string> => {
  const params = new URLSearchParams(window.location.search);
  const result: Record<string, string> = {};
  
  params.forEach((value, key) => {
    result[key] = value;
  });
  
  return result;
};
