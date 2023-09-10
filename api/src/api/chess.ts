// Packages
const WebApiRequest = require('../request/webapi-request.js');
const HttpManager = require('../request/http-manager.js');

// Types
import {
  ICurrentDailyGame,
  ICurrentDailyGames,
  ICurrentDailyGamesResponse,
} from '../types/chess';
import { Environment } from '../helpers/environment';
import { MOCKED_CHESS_PLAYER_CURRENT_DAILY_CHESS_RESPONSE } from '../data/chess';

/**
 * Default value for current daily games with no available games.
 */
const defaultCurrentDailyGames: ICurrentDailyGames = {
  games: [] as ICurrentDailyGame[],
};

/**
 * Requests current daily games from Chess.com.
 *
 * @returns {Promise<ICurrentDailyGames>} Object with array of game objects.
 */
const getCurrentGames = async (): Promise<ICurrentDailyGames> =>{
  if (Environment.useMockData()) {
    return MOCKED_CHESS_PLAYER_CURRENT_DAILY_CHESS_RESPONSE;
  }

  const response: ICurrentDailyGamesResponse = await WebApiRequest.builder()
    .withPath(`/pub/player/${Environment.getChessUsername()}/games`)
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);
  
  const { statusCode } = response;

  if (statusCode === 200) {
    return response.body;
  } else {
    return defaultCurrentDailyGames;
  }
};

export default {
  getCurrentGames,
};
