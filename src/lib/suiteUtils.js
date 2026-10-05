/**
 * JDLC Suite Applications Definition and Environment URL Resolver.
 */

export const SUITE_APPS = [
  {
    id: 'taskflow',
    name: 'TaskFlow',
    description: 'Tasks, Kanban & Sprint Tracker',
    badge: 'Productivity',
    color: '#7C3AED',
  },
  {
    id: 'budgetcast',
    name: 'BudgetCast',
    description: 'Cash Flow & Multi-Currency Forecast',
    badge: 'Finance',
    color: '#06B6D4',
  },
  {
    id: 'tripplanner',
    name: 'TripPlanner',
    description: 'Roadtrip & Travel Itineraries',
    badge: 'Travel',
    color: '#10B981',
  },
];

/**
 * Resolves the destination URL for a given suite application ID,
 * automatically detecting whether running on localhost or online in production.
 *
 * @param {string} appId - 'taskflow' | 'budgetcast' | 'tripplanner' | 'main'
 * @returns {string} Fully qualified URL for the target app
 */
export function getSuiteAppUrl(appId) {
  if (typeof window === 'undefined') return '#';

  try {
    const envKey = `VITE_${appId.toUpperCase()}_URL`;
    if (typeof process !== 'undefined' && process.env && process.env[envKey]) {
      return process.env[envKey];
    }
  } catch {}

  const hostname = window.location.hostname;
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.local') ||
    hostname === '0.0.0.0';

  // 1. Local Development Mode
  if (isLocal) {
    const localPorts = {
      taskflow: 5173,
      budgetcast: 5174,
      tripplanner: 5175,
      main: 5176,
    };
    return `http://localhost:${localPorts[appId] || 5173}`;
  }

  // 2. Production or Staging on *.jdlc.se
  if (hostname.includes('jdlc.se')) {
    if (appId === 'main') return 'https://jdlc.se';
    return `https://${appId}.jdlc.se`;
  }

  // 3. Fallback for custom domains or preview deployments
  return `https://${appId}.${hostname}`;
}
