function abo(mind) {
    function f() {
        if (typeof mind === 'function')
            return mind.apply(f, arguments);    //Error: apply(this, arguments)
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

    f.grow = function (idea) {
        var g = abo(idea || mind);
        g.assign(this);
        g.closet = [];
        var i, n = this.closet.length;
        for (i = 0; i < n; i++) {
            g.wear(this.closet[i]);
        }
        return g;
    };

    f.abo = abo;

    return f;
}

export default abo;
