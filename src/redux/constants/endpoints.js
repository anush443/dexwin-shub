let baseUrl = process.env.REACT_APP_BASE_URL;

// GET ALL USERS DATA ENDPOINTS
export const GET_ALL_ODDS =
  `${baseUrl}/api/live/odds?gameid=`;

  // Get Leagues Live Games
  export const GET_LEAGUES_GAMES_BY_ID = `${baseUrl}api/leagues/live-games?leagueId=`;
  export const GET_LEAGUES_GAMES = `${baseUrl}/api/leagues/live-games`;

  //Get Leagues Upcoming Games
  export const GET_UPCOMING_LEAGUES_GAMES_BY_ID = `${baseUrl}/api/leagues/upcomings-games?leagueId=`;
  export const GET_UPCOMING_LEAGUES_GAMES = `${baseUrl}/api/leagues/upcomings-games`;

