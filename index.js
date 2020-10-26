function ext(master, closet) {
    function f() {
        if (typeof master === 'function')
            return master.call(this, ...arguments);
    }

    Object.assign(f, master);

    f.closet = closet instanceof Array ? [...closet] : [];

    f.wear = function () {
        this.closet.push(...arguments);
    };

    f.grow = function () {
        return ext(master, this.closet);
    };

    return f;
}

export default ext;
