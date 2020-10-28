function ext(master) {
    function f() {
        if (typeof master === 'function')
            return master.apply(f, arguments);    //Error: apply(this, arguments)
    }

    f.closet = [];
    f.wear = function () {
        var i, arg;
        var n = arguments.length;
        for (i = 0; i < n; i++) {
            arg = arguments[i];
            this.closet.push(arg);
        }
    };

    f.assign = function () {
        var i, arg;
        var n = arguments.length;
        for (i = 0; i < n; i++) {
            arg = arguments[i];
            for (var key in arg) {
                if (Object.hasOwnProperty.call(arg, key)) {
                    this[key] = arg[key];
                }
            }
        }
    };

    f.grow = function (chief) {
        var g = ext(chief || master);
        g.assign(this);
        g.closet = [];
        this.closet.forEach(function (cl) {
            g.wear(cl);
        });
        return g;
    };

    f.ext = ext;

    return f;
}

export default ext;
