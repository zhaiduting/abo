function ext(master, closet) {
    function f() {
        if (typeof master === 'function')
            return master.call(this, ...arguments);
    }

    f.closet = closet instanceof Array ? [...closet] : [];

    f.wear = function (key, handler) {
        this.closet.push({key, handler});
    };

    f.grow = function () {
        return ext(f, this.closet);
    };

    return f;
}

export default ext;
