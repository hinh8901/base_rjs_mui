import { BASE_URL } from '@/config/env'
import {
  UIConfig,
  generateApiService,
} from '@/services/api/core/FunctionalApi'
import axios from 'axios'

class DummyError extends Error {
  name = ''
  constructor(name: string, message: string) {
    super(message)
    this.name = name
  }
}

interface DummyWrapper<T> {
  status?: number
  message?: string
  title?: string
  code?: number
  data: T
}

const DummyApiService = generateApiService({
  baseUrl: BASE_URL,
  defaultHeader: () => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }),
  onSuccess: (value, uiConfig: UIConfig) => {
    console.log(uiConfig)
    const checkSuccess = () => {
      //Logic check response is success
      console.log('Handle check success resp', value)
      return true
    }
    if (checkSuccess()) {
      return value
    }
    throw new DummyError('DummyError', 'Message for DummyError')
  },
  onError: (err, uiConfig) => {
    console.log(err, uiConfig)
    if (axios.isAxiosError(err)) {
      console.log('Handle Axios Err', err.code)
    } else if (err instanceof DummyError) {
      console.log('Handle DummyError Err', err.message)
    }
    throw err
  },
})

export default DummyApiService
