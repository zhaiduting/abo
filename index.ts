export interface IAbo<T = any, Super = any> {
    (mind?: any): any;

    closet: any[];

    wear(element: any, ...restElements: any[]): void;

    grow(...idea: any[]): T;

    use(
        funcArrObj: any,
        ignoreExisted?: boolean
    ): void;

    abo: (mind: any) => IAbo;
    super?: IAbo<Super>;

    [otherProps: string]: any;
}

function abo(mind?: any) {
    // @ts-ignore
    let f = function (this: any) {
        if (typeof mind === 'function') {
            f.hook = this;
            return mind.apply(f, arguments);
        }
    } as IAbo;

    f.closet = [];
    f.wear = function () {
        // @ts-ignore
        Array.prototype.push.apply(this.closet, arguments);
    };

    f.grow = function (idea: any) {
        let g = abo(idea || mind);
        g.use(f);
        g.super = f;
        return g;
    };

    f.use = function (funcArrObj: any, ignoreExisted?: boolean) {
        let reset = ignoreExisted;
        let type = funcArrObj instanceof Array ? 'array' : typeof funcArrObj;
        if (type === 'array') {
            if (reset)
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
    };

    f.abo = abo;

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

export default abo;
