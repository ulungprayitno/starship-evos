import {
  useCallback,
  useReducer
} from 'react'
import produce from 'immer'
import isEqual from 'react-fast-compare'
import api from '../utils/api'

const actionsType = {
  SET_FETCHING: 'SET_FETCHING',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_ERROR: 'SET_ERROR',
  SET_SUCCESS_DETAIL: 'SET_SUCCESS_DETAIL',
  SET_SUCCESS_TYPE: 'SET_SUCCESS_TYPE',
}

const initialState = {
  data: null,
  loading: false,
  error: null,
  next: null
}

const reducer = produce((draft, actions) => {
  const {type, payload = {}} = actions
  switch (type) {
    case actionsType.SET_FETCHING:
      draft.loading = true
      draft.error = null
      return
    case actionsType.SET_SUCCESS:
      if (!isEqual(draft.data, payload.data)) {
        draft.data = payload.data
        draft.next = payload.next
        draft.loading = false
      }
      return
    case actionsType.SET_ERROR:
      draft.error = payload.error
      draft.loading = false
      return
    default:
      throw new Error('Unknown action type')
  }
})

export const useLazyFetch = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data, loading, error , next} = state

  const fetchData = useCallback(async (param) => {
    const params = param === undefined || param === "" ? '' : `?search=${param}`

    dispatch({
      type: actionsType.SET_FETCHING,
    });

    const res = await api.get(`/starships${params}`);

    if (res) {
      let response = res.data.results;

      dispatch({
        type: actionsType.SET_SUCCESS,
        payload: {
          data: response,
          next: res.data.next
        },
      })
    } else {
      dispatch({
        type: actionsType.SET_ERROR,
        payload: {
          error: res,
        },
      })
    }
  }, []);

  const fetchMore = useCallback(async () => {
    if (next === null) return
    dispatch({
      type: actionsType.SET_FETCHING,
    });
    const res = await api.get(next);

    if (res) {
      let response = res.data.results;
      console.log(data)
      dispatch({
        type: actionsType.SET_SUCCESS,
        payload: {
          data: [...data, ...response],
          next: res.data.next
        },
      })
    } else {
      dispatch({
        type: actionsType.SET_ERROR,
        payload: {
          error: res,
        },
      })
    }
  }, [next, data]);



  const getDetailById = useCallback(async (id) => {

    dispatch({
      type: actionsType.SET_FETCHING,
    });

    const res = await api.get(`/starships/${id}`);

    if (res) {
      const response = res.data;
      const responsePilot = await Promise.all(response.pilots.map(async item => await (await api.get(item)).data));
      const responseFilm = await Promise.all(response.films.map(async item => await (await api.get(item)).data));
      response.pilots = responsePilot
      response.films = responseFilm
      
      dispatch({
        type: actionsType.SET_SUCCESS,
        payload: {
          data: response,
        },
      })
    } else {
      dispatch({
        type: actionsType.SET_ERROR,
        payload: {
          error: res,
        },
      })
    }
  }, []);

  return [{ loading, error, data, next}, {fetchData, getDetailById, fetchMore}]
}