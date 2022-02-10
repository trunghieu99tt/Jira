import {
  appendToQueryString,
  omitFromQueryString,
  queryStringToObject,
} from '@utils/url';
import { useNavigate, useLocation } from 'react-router-dom';

export const useQueryParamModal = (param: string) => {
  const navigate = useNavigate();
  const location = useLocation();

  const open = () =>
    navigate({
      pathname: location.pathname,
      search: appendToQueryString(location.search, {
        [`modal-${param}`]: true,
      }),
    });

  const close = () =>
    navigate({
      pathname: location.pathname,
      search: omitFromQueryString(location.search, [`modal-${param}`]),
    });

  const isOpen = () =>
    !!(`modal-${param}` in queryStringToObject(location.search));

  return {
    open,
    close,
    isOpen,
  };
};
