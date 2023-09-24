# HOW IT WOKS

I came accross this really nice [README](https://github.com/andyruwruw/andyruwruw) from [andyruwruw](https://github.com/andyruwruw) and wanted to use it here as well.

### Available pages

- https://chesscom-vercel.vercel.app/chess-current-games/?username=YOUR_USERNAME
- https://chesscom-vercel.vercel.app/chess-last-games/?username=YOUR_USERNAME

### Replacing the `chess-web-api`

Unfortunately, at the time of this fork, the [chess-web-api](https://www.npmjs.com/package/chess-web-api) wrapper (also from [andyruwruw](https://github.com/andyruwruw)) is suffering from the recent [Breaking Change: User-Agent Contact Info Required](https://www.chess.com/news/view/breaking-change-user-agent-contact-info-required) update from Chess.com (See [issue](https://github.com/andyruwruw/chess-web-api/issues/35))

So instead, this fork removes the [chess-web-api](https://www.npmjs.com/package/chess-web-api) and **copy/use (without any modification) the [request's code](https://github.com/andyruwruw/chess-web-api/tree/master/src/request) from the API**. 

```diff
-  const response: ICurrentDailyGamesResponse = await chessAPI.getPlayerCurrentDailyChess(Environment.getChessUsername());
+  const response: IDailyGamesResponse = await WebApiRequest.builder()
+   .withPath(`/pub/player/${username}/games`)
+   .withHeaders({'User-Agent': Environment.getEmail()})
+   .build()
+   .execute(HttpManager.get);
```

### Adding the last played games

Query the last played games

```ts
  // Get the game archives
  const response_archive: IArchiveResponse = await WebApiRequest.builder()
    .withPath(`/pub/player/${username}/games/archives`)
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);
  
  if (response_archive.statusCode !== 200) {
    return defaultLastFinishedGames;
  }

  // Get last month in the archive
  const url_last_month = response_archive.body.archives[response_archive.body.archives.length - 1];

  // TODO: Extend the search if not "enough" games were played last month
  // Get the games played this month
  const response_games: IFinishedGamesResponse = await WebApiRequest.builder()
    .withPath(url_last_month.substring('https://api.chess.com'.length))
    .withHeaders({'User-Agent': Environment.getEmail()})
    .build()
    .execute(HttpManager.get);
```

### Next

TBD:
- not 3 but `x` games to viz
- more things to viz
- dark mode?
- ...
