function ext(master) {
    function f() {
        if (typeof master === 'function')
            return master.call(f, ...arguments);    //Error: call(this, ...arguments)
    }

    f.closet = [];
    f.wear = function () {
        this.closet.push(...arguments);
    };

    f.assign = function () {
        Object.assign(this, ...arguments);
    };

    f.grow = function (chief) {
        let g = ext(chief || master);
        g.assign(this);
        g.closet = [];
        g.wear(...this.closet);
        return g;
    };

    f.ext = ext;

    return f;
}

export default ext;
