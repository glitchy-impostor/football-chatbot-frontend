// NFL Team data
export const NFL_TEAMS = {
  // AFC East
  BUF: { name: 'Buffalo Bills', abbr: 'BUF', primary: '#00338D', secondary: '#C60C30', conference: 'AFC', division: 'East' },
  MIA: { name: 'Miami Dolphins', abbr: 'MIA', primary: '#008E97', secondary: '#FC4C02', conference: 'AFC', division: 'East' },
  NE: { name: 'New England Patriots', abbr: 'NE', primary: '#002244', secondary: '#C60C30', conference: 'AFC', division: 'East' },
  NYJ: { name: 'New York Jets', abbr: 'NYJ', primary: '#125740', secondary: '#FFFFFF', conference: 'AFC', division: 'East' },
  
  // AFC North
  BAL: { name: 'Baltimore Ravens', abbr: 'BAL', primary: '#241773', secondary: '#000000', conference: 'AFC', division: 'North' },
  CIN: { name: 'Cincinnati Bengals', abbr: 'CIN', primary: '#FB4F14', secondary: '#000000', conference: 'AFC', division: 'North' },
  CLE: { name: 'Cleveland Browns', abbr: 'CLE', primary: '#311D00', secondary: '#FF3C00', conference: 'AFC', division: 'North' },
  PIT: { name: 'Pittsburgh Steelers', abbr: 'PIT', primary: '#FFB612', secondary: '#101820', conference: 'AFC', division: 'North' },
  
  // AFC South
  HOU: { name: 'Houston Texans', abbr: 'HOU', primary: '#03202F', secondary: '#A71930', conference: 'AFC', division: 'South' },
  IND: { name: 'Indianapolis Colts', abbr: 'IND', primary: '#002C5F', secondary: '#A2AAAD', conference: 'AFC', division: 'South' },
  JAX: { name: 'Jacksonville Jaguars', abbr: 'JAX', primary: '#006778', secondary: '#D7A22A', conference: 'AFC', division: 'South' },
  TEN: { name: 'Tennessee Titans', abbr: 'TEN', primary: '#0C2340', secondary: '#4B92DB', conference: 'AFC', division: 'South' },
  
  // AFC West
  DEN: { name: 'Denver Broncos', abbr: 'DEN', primary: '#FB4F14', secondary: '#002244', conference: 'AFC', division: 'West' },
  KC: { name: 'Kansas City Chiefs', abbr: 'KC', primary: '#E31837', secondary: '#FFB81C', conference: 'AFC', division: 'West' },
  LV: { name: 'Las Vegas Raiders', abbr: 'LV', primary: '#000000', secondary: '#A5ACAF', conference: 'AFC', division: 'West' },
  LAC: { name: 'Los Angeles Chargers', abbr: 'LAC', primary: '#0080C6', secondary: '#FFC20E', conference: 'AFC', division: 'West' },
  
  // NFC East
  DAL: { name: 'Dallas Cowboys', abbr: 'DAL', primary: '#003594', secondary: '#869397', conference: 'NFC', division: 'East' },
  NYG: { name: 'New York Giants', abbr: 'NYG', primary: '#0B2265', secondary: '#A71930', conference: 'NFC', division: 'East' },
  PHI: { name: 'Philadelphia Eagles', abbr: 'PHI', primary: '#004C54', secondary: '#A5ACAF', conference: 'NFC', division: 'East' },
  WAS: { name: 'Washington Commanders', abbr: 'WAS', primary: '#5A1414', secondary: '#FFB612', conference: 'NFC', division: 'East' },
  
  // NFC North
  CHI: { name: 'Chicago Bears', abbr: 'CHI', primary: '#0B162A', secondary: '#C83803', conference: 'NFC', division: 'North' },
  DET: { name: 'Detroit Lions', abbr: 'DET', primary: '#0076B6', secondary: '#B0B7BC', conference: 'NFC', division: 'North' },
  GB: { name: 'Green Bay Packers', abbr: 'GB', primary: '#203731', secondary: '#FFB612', conference: 'NFC', division: 'North' },
  MIN: { name: 'Minnesota Vikings', abbr: 'MIN', primary: '#4F2683', secondary: '#FFC62F', conference: 'NFC', division: 'North' },
  
  // NFC South
  ATL: { name: 'Atlanta Falcons', abbr: 'ATL', primary: '#A71930', secondary: '#000000', conference: 'NFC', division: 'South' },
  CAR: { name: 'Carolina Panthers', abbr: 'CAR', primary: '#0085CA', secondary: '#101820', conference: 'NFC', division: 'South' },
  NO: { name: 'New Orleans Saints', abbr: 'NO', primary: '#D3BC8D', secondary: '#101820', conference: 'NFC', division: 'South' },
  TB: { name: 'Tampa Bay Buccaneers', abbr: 'TB', primary: '#D50A0A', secondary: '#34302B', conference: 'NFC', division: 'South' },
  
  // NFC West
  ARI: { name: 'Arizona Cardinals', abbr: 'ARI', primary: '#97233F', secondary: '#000000', conference: 'NFC', division: 'West' },
  LA: { name: 'Los Angeles Rams', abbr: 'LA', primary: '#003594', secondary: '#FFA300', conference: 'NFC', division: 'West' },
  SF: { name: 'San Francisco 49ers', abbr: 'SF', primary: '#AA0000', secondary: '#B3995D', conference: 'NFC', division: 'West' },
  SEA: { name: 'Seattle Seahawks', abbr: 'SEA', primary: '#002244', secondary: '#69BE28', conference: 'NFC', division: 'West' },
};

export const getTeam = (abbr) => NFL_TEAMS[abbr?.toUpperCase()] || null;

export const getTeamColor = (abbr, type = 'primary') => {
  const team = getTeam(abbr);
  return team ? team[type] : '#6B7280';
};

export const getAllTeams = () => Object.values(NFL_TEAMS);

export const getTeamsByConference = (conference) => 
  getAllTeams().filter(t => t.conference === conference);

export const getTeamsByDivision = (conference, division) =>
  getAllTeams().filter(t => t.conference === conference && t.division === division);

// Quick action suggestions
export const QUICK_ACTIONS = [
  { label: '🏈 Team Profile', query: 'Tell me about the {team}' },
  { label: '⚔️ Matchup', query: '{team} vs {opponent} matchup analysis' },
  { label: '📊 Run or Pass?', query: 'Should I run or pass on 3rd and 5?' },
  { label: '🎯 4th Down', query: 'Should I go for it on 4th and 2 at the 35?' },
  { label: '🏆 Top RBs', query: 'Top 10 running backs by EPA' },
  { label: '📈 Top QBs', query: 'Top 10 quarterbacks by EPA' },
];

export const SAMPLE_QUERIES = [
  "How do the Chiefs compare to the 49ers?",
  "What are the Ravens' tendencies on 3rd down?",
  "Should I go for it on 4th and 1 at the 40?",
  "Who are the top 5 running backs by EPA?",
  "Tell me about the Eagles offense",
  "Run or pass on 2nd and 8 at midfield?",
];
