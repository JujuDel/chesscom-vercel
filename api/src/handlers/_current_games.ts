// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { renderToString } from 'react-dom/server';

// Local Imports
import {
  getPieces,
  convertDailyGameObject,
  createEmptyGameObject,
} from '../helpers/_chess';
import { convertToImageResponse } from '../helpers/_image';
import { CurrentGames } from '../components/chess/_CurrentGames';
import api from '../api';

// Types
import { IConvertedDailyGameObject } from '../types/_daily';

/**
 * Returns an image displaying three of my current chess games from Chess.com.
 *
 * @param {VercelRequest} req Request for image.
 * @param {VercelResponse} res Response to request.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
) {
  const username = req.query.username;
  if (!username) {
    throw new Error('Empty username');
  }
  const str_username = String(username);

  // Using an awesome library called chess-web-api to get our data ;)
  const currentDailyGames = (await api.chess.getCurrentGames(str_username)).games;

  // Limiting the width of the games.
  currentDailyGames.length = Math.min(
    currentDailyGames.length,
    3,
  );

  // There's a lot of data we don't need! Converting the FEN to an array
  const convertedCurrentGames: IConvertedDailyGameObject[] = await Promise.all([
    ...currentDailyGames.map((game) => convertDailyGameObject(game, str_username)),
  ]);

  // Adding empty spots if there aren't 3!
  for (let i = convertedCurrentGames.length; i < 3; i++) {
    convertedCurrentGames.push(createEmptyGameObject() as IConvertedDailyGameObject);
  }

  // Hey! I'm returning an image!
  convertToImageResponse(res);

  const pieceImages: object = await getPieces();

  // Generating the component and rendering it
  const text: string = renderToString(
    CurrentGames({
      games: convertedCurrentGames,
      pieceImages: pieceImages,
    }),
  );

  return res.send(text);
}
