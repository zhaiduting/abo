interface IAbo {
    (mind?: unknown): void

    grow: <O>(this: O, idea?: unknown) => O & { old: O }
    Grow: <O>(this: O) => (idea?: unknown) => O & { old: O }

    use<N, E>(
        this: E,
        funcArrObj: N,
        ignoreExisted?: boolean
    ): N & E;

    wear<T>(this: T, element: any, ...restElements: any[]): T;

    closet: any[];

    abo(): IAbo

    hook: unknown
    old: unknown

    // [otherProp: string]: any
}

function Abo(mind?: any) {
    let f = function (this: any) {
        if (typeof mind === 'function') {
            f.hook = this;
            return mind.apply(f, arguments);
        }
    } as IAbo;

    f.closet = [];

    // @ts-ignore
    f.wear = function () {
        // @ts-ignore
        Array.prototype.push.apply(this.closet, arguments);
        return f
    };

    // @ts-ignore
    f.grow = function (idea?) {
        let g = Abo(idea || mind);
        g.use(f);
        g.old = f;
        return g;
    };
    f.Grow = function () {
        return f.grow;
    };

    // @ts-ignore
    f.use = function <N, E>(this: E, funcArrObj: N, ignoreExisted?: boolean) {
        let reset = ignoreExisted;
        let type = funcArrObj instanceof Array ? 'array' : typeof funcArrObj;
        if (type === 'array') {
            if (reset)
                // @ts-ignore
                this.closet = [];
            // @ts-ignore
            Array.prototype.push.apply(this.closet, funcArrObj);
        } else if (type === 'function' || type === 'object') {
            for (let key in funcArrObj) {
                if (!Object.prototype.hasOwnProperty.call(funcArrObj, key))
                    continue;
                if (key !== 'grow')
                    assign(this, key, funcArrObj[key], reset);
            }
        }

        return f;
    };

    return f;
}

function assign(target: any, key: any, right: any, reset: boolean = false) {
    let typeOfLeft = target[key] instanceof Array ? 'array' : typeof target[key];
    let typeOfRight = right instanceof Array ? 'array' : typeof right;
    if (typeOfRight === 'array') {
        if (reset || typeOfLeft !== 'array')
            target[key] = [];
        Array.prototype.push.apply(target[key], right);
    } else if (typeOfRight === 'object') {
        if (reset || typeOfLeft !== 'object' && typeOfLeft !== 'array')
            target[key] = {};
        set(target[key], right);
    } else {
        target[key] = right;
    }
}

function set(left: any, right: any) {
    for (let k in right) {
        if (!Object.prototype.hasOwnProperty.call(right, k))
            continue;
        left[k] = right[k];
    }
}

const abo = Abo();
export default abo.Grow();
