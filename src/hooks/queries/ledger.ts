import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import queryKeys from 'constants/queryKeys';
import fakeApi from 'apis/test';
import MyTicketInfoResponseData from 'mocks/ledger/user/MyTicketInfoResponseData.json';
import { MyTicketInfoResponseDto } from 'models/ledger/response/MyTicketInfoResponseDto';
import { ApplicationInfoResponseDto } from 'models/ledger/response/ApplicationInfoResponseDto';
import ApplicationInfoResponseData from 'mocks/ledger/user/ApplicationInfoResponseData.json';
import { getHostEventLists } from 'apis/ledger';
import { FieldCode } from 'constants/code';

// TODO: 이벤트 상세 정보 조회
export const useUserTickets = (eventId: number) => {
  return useQuery(
    [...queryKeys.participantKeys.cardById(eventId)],
    () =>
      fakeApi<MyTicketInfoResponseDto[]>(
        MyTicketInfoResponseData as MyTicketInfoResponseDto[],
      ),
    { select: (data) => data.data },
  );
};

// TODO 삭제
export const useApplyEvent = (
  successCallback?: () => void,
  errorCallback?: () => void,
) => {
  return useMutation(() => fakeApi(), {
    onSuccess: successCallback,
    onError: errorCallback,
  });
};

// TODO: 내 이벤트 - 참여 이벤트 리스트 조회
export const useUserTicketLists = () => {
  return useQuery(
    [...queryKeys.participantKeys.list],
    () =>
      fakeApi<ApplicationInfoResponseDto[]>(
        ApplicationInfoResponseData as unknown as ApplicationInfoResponseDto[],
      ),
    { select: (data) => data.data },
  );
};

export const useHostEventLists = (fieldType?: FieldCode) => {
  const query = useInfiniteQuery(
    fieldType
      ? [...queryKeys.hostKeys.listByFieldCode(fieldType)]
      : [...queryKeys.hostKeys.list],
    ({ pageParam = null }) =>
      getHostEventLists({
        eventInfoId: pageParam ?? undefined,
        fieldType,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastIdx = lastPage.data?.content.length;
        if (!lastIdx || !lastPage.data?.hasNext) {
          return false;
        }
        return lastPage.data?.content[lastIdx - 1].eventInfoId;
      },
    },
  );
  return query;
};
