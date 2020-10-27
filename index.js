function ext(master) {
    function f() {
        if (typeof master === 'function')
            return master.call(f, ...arguments);
    }

    f.closet = [];
    f.wear = function () {
        f.closet.push(...arguments);
    };

    f.assign = function () {
        Object.assign(f, ...arguments);
    };

    f.grow = function () {
        let g = ext(master);
        g.wear(f.closet);
        g.assign(f);
        return g;
    };

    f.ext = ext;

    return f;
}

export default ext;
