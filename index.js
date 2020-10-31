function abo(mind) {
    function f() {
        if (typeof mind === 'function')
            return mind.apply(f, arguments);    //Error: apply(this, arguments)
    }

    f.closet = [];
    f.wear = function () {
        Array.prototype.push.apply(this.closet, arguments);
    };

    f.grow = function (idea) {
        var g = abo(idea || mind);
        g.use(this);
        return g;
    };

    f.use = function (funcArrObj, ignoreExisted) {
        var reset = ignoreExisted;
        var type = funcArrObj instanceof Array ? 'array' : typeof funcArrObj;
        if (type === 'array') {
            if (reset)
                this.closet = [];
            Array.prototype.push.apply(this.closet, funcArrObj);
        } else if (type === 'object' || type === 'function') {
            for (var key in funcArrObj) {
                if (!Object.hasOwnProperty.call(funcArrObj, key))
                    continue;
                assign(this, key, funcArrObj[key], reset);
            }
        }
    };

    f.abo = abo;

    return f;
}

function assign(target, key, right, reset) {
    var typeOfLeft = target[key] instanceof Array ? 'array' : typeof target[key];
    var typeOfRight = right instanceof Array ? 'array' : typeof right;
    switch (typeOfRight) {
        case 'array':
            if (reset || typeOfLeft !== 'array')
                target[key] = [];
            Array.prototype.push.call(target[key], right);
            break;
        case 'object':
            if (reset || typeOfLeft !== 'object' && typeOfLeft !== 'array')
                target[key] = {};
            set(target[key], right);
            break;
        default:
            target[key] = right;
    }
}

function set(left, right) {
    for (var k in right) {
        if (!Object.hasOwnProperty.call(right, k))
            continue;
        left[k] = right[k];
    }
}

export default abo;
