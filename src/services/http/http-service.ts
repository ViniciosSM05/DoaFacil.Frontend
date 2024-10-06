import { EnumHttpMethod } from '@/enums/http/EnumHttpMethod'
import axios, { type AxiosHeaderValue, type AxiosResponse, type AxiosRequestConfig } from 'axios'

export const useHttpService = (controllerRoute = '') => {
  function getFormatedParamsObject(baseObj: any, basePropName = '') {
    const formatedParamsObject = {}

    for (const key in baseObj) {
      const value = baseObj[key as keyof object]

      let propName = key
      if (typeof baseObj === 'object') propName = `${basePropName}.${key}`
      else if (Array.isArray(baseObj)) propName = `${basePropName}[${key}]`

      if (propName.startsWith('.')) propName = propName.substring(1)
      else if (propName.startsWith('[')) propName = propName.substring(1, propName.length - 1)

      if (typeof value === 'object' || Array.isArray(value)) {
        Object.assign(formatedParamsObject, getFormatedParamsObject(value, propName))
      } else {
        formatedParamsObject[propName as keyof object] = value as never
      }
    }

    return formatedParamsObject
  }

  function prepareUrl(url: string, params?: any, paramsInUrl?: boolean) {
    let endPoint = `v1/${controllerRoute}/${url}`
    if (paramsInUrl && params)
      endPoint += `?${new URLSearchParams(getFormatedParamsObject(params ?? {})).toString()}`
    return endPoint
  }

  function request<TResponse>(
    url: string,
    method: EnumHttpMethod,
    params?: any,
    headers?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<TResponse>> {
    const config: AxiosRequestConfig = {
      headers: {
        ...(headers ?? {})
      }
    }

    switch (method) {
      case EnumHttpMethod.DELETE:
        return axios.delete<TResponse>(prepareUrl(url, params, true), config)
      case EnumHttpMethod.GET:
        return axios.get<TResponse>(prepareUrl(url, params, true), config)
      case EnumHttpMethod.POST:
        return axios.post<TResponse>(prepareUrl(url), params, config)
      case EnumHttpMethod.PUT:
        return axios.put<TResponse>(prepareUrl(url), params, config)
    }
  }

  function get<TResponse>(
    url: string,
    params?: any,
    headers?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<TResponse>> {
    return request<TResponse>(url, EnumHttpMethod.GET, params, headers)
  }

  function post<TResponse>(
    url: string,
    body?: any,
    headers?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<TResponse>> {
    return request<TResponse>(url, EnumHttpMethod.POST, body, headers)
  }

  function put<TResponse>(
    url: string,
    body?: any,
    headers?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<TResponse>> {
    return request<TResponse>(url, EnumHttpMethod.PUT, body, headers)
  }

  function remove<TResponse>(
    url: string,
    body?: any,
    headers?: Record<string, AxiosHeaderValue>
  ): Promise<AxiosResponse<TResponse>> {
    return request<TResponse>(url, EnumHttpMethod.DELETE, body, headers)
  }

  return { get, post, put, remove }
}
