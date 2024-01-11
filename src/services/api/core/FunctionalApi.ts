// ________                                 __      __                                __         ______   _______  ______
// |        \                               |  \    |  \                              |  \       /      \ |       \|      \
// | ########__    __  _______    _______  _| ##_    \##  ______   _______    ______  | ##      |  ######\| #######\\######
// | ##__   |  \  |  \|       \  /       \|   ## \  |  \ /      \ |       \  |      \ | ##      | ##__| ##| ##__/ ## | ##
// | ##  \  | ##  | ##| #######\|  ####### \######  | ##|  ######\| #######\  \######\| ##      | ##    ##| ##    ## | ##
// | #####  | ##  | ##| ##  | ##| ##        | ## __ | ##| ##  | ##| ##  | ## /      ##| ##      | ########| #######  | ##
// | ##     | ##__/ ##| ##  | ##| ##_____   | ##|  \| ##| ##__/ ##| ##  | ##|  #######| ##      | ##  | ##| ##      _| ##_
// | ##      \##    ##| ##  | ## \##     \   \##  ##| ## \##    ##| ##  | ## \##    ##| ##      | ##  | ##| ##     |   ## \
// \##       \######  \##   \##  \#######    \####  \##  \######  \##   \##  \####### \##       \##   \## \##      \######
//

import { globalLoading } from "@/components/GlobalLoading"
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios"
import qs from "qs"

type AxiosRequestHeaders = {
  [x: string]: string | number | boolean
}

/** Basic configuration for all APIs */
type BaseConfig = {
  /** Base url of the api */
  baseUrl: string

  /** Axios default header configuration for the whole api, for example: token, timeout, accept, content-type,... */
  defaultHeader: () => AxiosRequestHeaders

  /** Callback for post processing data after request succeeded */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: <R>(value: any, uiConfig: UIConfig) => R | Promise<R>

  /** Callback for handling errors */
  onError: (error: unknown, uiConfig: UIConfig) => unknown

  /**Callback for handling interceptor request and response */
  onInterceptorApi?: {
    request?: {
      onFullfilled?: <I>(
        config: InternalAxiosRequestConfig<I>
      ) =>
        | InternalAxiosRequestConfig<I>
        | Promise<InternalAxiosRequestConfig<I>>
      onRejected?: (error: unknown) => unknown
    }
    response?: {
      onFullfilled?: <R>(
        res: AxiosResponse
      ) => AxiosResponse<R> | Promise<AxiosResponse<R>>
      onRejected?: <E>(error: E) => E
    }
  }
}

/** Configuration used on specific API */
type ApiConfig<I> = {
  /** Endpoint only, eg. /v1/auth/login */
  route: string

  /** Either request body for POST, PUT or request param for GET, DELETE */
  data: I

  /** @see UIConfig */
  uiConfig: UIConfig

  /** Axios header configuration for specific API */
  headers: AxiosRequestHeaders
}

type PopupConfig = {
  popupSuccess?: {
    isShow?: boolean
    customText?: string
    customTitle?: string
    buttons?: { text: string }[]
  }
  popupError?: {
    isShow?: boolean
    customText?: string
    customTitle?: string
    buttons?: { text: string }[]
  }
}

/** Determine additional UI actions */
export type UIConfig = {
  /** Whether show loading or not */
  loading?: boolean
  /** Message to show on loading screen */
  loadingMessage?: string

  /** Used for customize popup config */
  popupConfig?: PopupConfig
}
const defaultUIConfig: UIConfig = {
  loading: true,
  loadingMessage: "",
  popupConfig: {
    popupError: {
      isShow: true,
    },
    popupSuccess: {
      isShow: false,
    },
  },
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

/**
 * Construct an runner instance that call api with pre-defined configurations
 */
export class ApiRunner<I, O> {
  baseConfig: BaseConfig
  route: string
  data: I
  headers: AxiosRequestHeaders
  uiConfig: UIConfig
  method: RequestMethod
  isDownloadable: boolean
  isUseInterceptor?: boolean

  constructor(
    method: RequestMethod,
    baseConfig: BaseConfig,
    apiConfig: ApiConfig<I>
  ) {
    this.baseConfig = baseConfig
    this.route = apiConfig.route
    this.data = apiConfig.data
    this.uiConfig = apiConfig.uiConfig
    this.headers = apiConfig.headers
    this.method = method
    this.isDownloadable = false
  }

  setLoading(loading: boolean) {
    this.uiConfig.loading = loading
    return this
  }

  setLoadingMessage(loadingMessage: string) {
    this.uiConfig.loadingMessage = loadingMessage
    return this
  }

  setConfigPopup(popupConfig: PopupConfig) {
    this.uiConfig.popupConfig = {
      ...this.uiConfig.popupConfig,
      ...popupConfig,
    }
    return this
  }

  setConfigHeaders(headers: AxiosRequestHeaders) {
    const newHeaders = { ...this.headers, ...headers }
    this.headers = newHeaders
    return this
  }

  setUseInterceptor(isUse: boolean) {
    this.isUseInterceptor = isUse
    return this
  }

  setUIconfigure(uiConfig: UIConfig) {
    const newConfig = { ...this.uiConfig, ...uiConfig }
    this.uiConfig = newConfig
    return this
  }

  setIsDownloadable(isDownloadable: boolean) {
    this.isDownloadable = isDownloadable
    return this
  }

  /**
   * Invoke function that sends request to server
   * ```
   * const runner = new ApiRunner("GET", baseConfig, apiConfig);
   * runner.run();
   * ```
   * @returns Promise<O> with O is output type/interface
   */
  async run() {
    let url = `${this.baseConfig.baseUrl}${this.route}`
    let data: I | null = this.data
    const isQuery = this.method === "GET" || this.method === "DELETE"
    if (isQuery && data) {
      const query = qs.stringify(data)
      url = `${url}?${query}`
      data = null
    }
    const options: AxiosRequestConfig = {
      method: this.method,
      url,
      timeout: 6000,
      headers: {
        ...this.baseConfig.defaultHeader(),
        ...(Boolean(this.headers) && this.headers),
      },
    }
    if (data) {
      Object.assign(options, {
        data: data,
      })
    }
    // Update loading message while sending request
    if (this.uiConfig.loading) {
      globalLoading.show()
    }
    // if (this.uiConfig.loadingMessage) {
    //   LoadingPortal.setMessage(this.uiConfig.loadingMessage);
    // }
    const instance = axios.create()
    if (this.baseConfig.onInterceptorApi && this.isUseInterceptor) {
      instance.interceptors.request.use(
        this.baseConfig.onInterceptorApi.request?.onFullfilled<I>,
        this.baseConfig.onInterceptorApi.request?.onRejected
      )
      instance.interceptors.response.use(
        this.baseConfig.onInterceptorApi.response?.onFullfilled<O>,
        this.baseConfig.onInterceptorApi.response?.onRejected
      )
    }

    try {
      console.log({ options })
      if (this.isDownloadable) {
        options.responseType = "arraybuffer"
        options.responseEncoding = "binary"
      }

      const rs = await instance(options)
      return this.baseConfig.onSuccess<O>(rs.data, this.uiConfig)
    } catch (error) {
      this.baseConfig.onError(error, this.uiConfig)
    } finally {
      if (this.uiConfig.loading) {
        globalLoading.hide()
      }
    }
  }
}
/**
 * Functional API generator
 * @params @see BaseConfig
 * @returns Object includes GET, POST, PUT, DELETE function accept ApiConfig param, @see ApiConfig
 */
function generateApiService(baseConfig: BaseConfig) {
  const FETCH = <I, O>(
    method: RequestMethod,
    apiConfig: ApiConfig<I>
  ): ApiRunner<I, O> => {
    return new ApiRunner(method, baseConfig, {
      route: apiConfig.route,
      data: apiConfig.data,
      headers: apiConfig.headers,
      uiConfig: Object.assign(apiConfig.uiConfig, defaultUIConfig),
    })
  }
  const ApiService = {
    GET<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>("GET", { route, data, headers, uiConfig: {} })
    },

    POST<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>("POST", { route, data, headers, uiConfig: {} })
    },

    PUT<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>("PUT", { route, data, headers, uiConfig: {} })
    },

    DELETE<I, O>(route: string, data: I, headers = {}): ApiRunner<I, O> {
      return FETCH<I, O>("DELETE", { route, data, headers, uiConfig: {} })
    },
  }

  return ApiService
}

export { generateApiService }
