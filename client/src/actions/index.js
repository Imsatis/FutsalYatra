import callApi from '../functions/callApi';
export const GET_ACTIVITY_LOGS = "GET_ACTIVITY_LOGS";
export const GET_ACTIVITY_LOG = "GET_ACTIVITY_LOG";
export const ACTIVITY_PAGE_LIMIT = 10;

/**
 * Get activity logs
 */
export function getActivityLogs(values, callback) {
    const request = callApi(`activity-logs`, 'GET', values, callback);
    return {
        type: GET_ACTIVITY_LOGS,
        payload: request
    };
}

/**
 * Get activity log
 */
export function getActivityLog(logId, callback) {
    const request = callApi(`activity-logs/${logId}`, 'GET', '', callback);
    return {
        type: GET_ACTIVITY_LOG,
        payload: request
    };
}