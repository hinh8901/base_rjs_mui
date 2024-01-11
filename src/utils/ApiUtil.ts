import { AxiosRequestConfig, AxiosResponse } from "axios"

import axiosInstance from "@/config/axios"
import { RESPONSE_CODE } from "@/constants/HTTPResponseStatus"

interface RequestConfig extends AxiosRequestConfig {
  contentType: string
}

interface FetchParams {
  url: string
  config: AxiosRequestConfig
  contentType?: string
  useGeneralErrorHandlding?: boolean
}

class ApiUtil {
  async configRequest(config: RequestConfig) {
    const {
      method = "POST",
      timeout = 3000,
      headers = {},
      contentType,
      url,
    } = config

    return {
      url,
      method,
      timeout,
      headers: {
        ...headers,
        "Content-Type": contentType,
        Authorization: "Bearer Token...",
      },
    }
  }

  async onError(response: AxiosResponse) {
    const { data: responseData } = response

    switch (responseData.status) {
      case RESPONSE_CODE.UNAUTHORIZE:
        break

      case RESPONSE_CODE.FORBIDDEN:
        break

      case RESPONSE_CODE.CONTENT_TOO_LARGE:
        break

      default:
    }
  }

  async fetch(params: FetchParams) {
    const {
      url,
      config,
      contentType = "application/json",
      useGeneralErrorHandlding = true
    } = params

    try {
      const requestConfig = await this.configRequest({
        ...config,
        contentType,
        url,
      })
      const response = await axiosInstance(requestConfig)

      if (response.data.status !== RESPONSE_CODE.SUCCESS && useGeneralErrorHandlding) this.onError(response)
      return response
    } catch (error) {}
  }
}

export default new ApiUtil()
