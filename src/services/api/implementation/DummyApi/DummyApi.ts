import DummyApiService from '@/services/api/factory/DummyApiService'
import { endpoints } from '@/services/api/implementation/DummyApi/endpoint'
import {
  DummyReq,
  DummyResp,
} from '@/services/api/implementation/DummyApi/types'

export const DummyApi = {
  getDummyData: (dumReq: DummyReq) => {
    return DummyApiService.GET<DummyReq, any>(
      endpoints.getSingleProduct,
      dumReq,
    )
  },
};
