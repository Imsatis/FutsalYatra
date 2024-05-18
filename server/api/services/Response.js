module.exports = {
    error: function (message, title='', data = null) {
        var rReturn = {};
        rReturn['status'] = 'error';
        if(title){
            rReturn['title'] = title;
        }
        rReturn['message'] = (typeof message === 'object') ? JSON.stringify(message) : message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },
    blocked: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'blocked';
        rReturn['message'] = (typeof message === 'object') ? JSON.stringify(message) : message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },
    success: function (message, data = null, extra = null) {
        var rReturn = {};
        rReturn['status'] = 'success';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        if (extra) {
            rReturn['extra'] = extra;
        }
        return rReturn;
    },

    inprogress: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'inprogress';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },

    failed: function (message, data = null) {
        var rReturn = {};
        rReturn['status'] = 'failed';
        rReturn['message'] = message;
        if (data) {
            rReturn['data'] = data;
        }
        return rReturn;
    },

    results: function (message, data, count, recordExist = false, allCount = 0) {
        var rReturn = {};
        rReturn['status'] = 'success';
        rReturn['message'] = message;
        rReturn['data'] = { list: data, size: count, record_exist: recordExist, all_count: allCount };
        return rReturn;
    },
}