function ext(master, closet) {
    function f() {
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
