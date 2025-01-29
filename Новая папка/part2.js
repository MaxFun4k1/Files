function foo(obj) {
    const set = new WeakSet();

    return (function checkLinkCycles(obj) {
        for (key in obj) {
            if (obj[key].toString() === "[object Object]") {
                if (Object.is(obj, obj[key])) {
                    return true;
                } else if (set.has(obj[key])) {
                    console.log(obj[key]);
                    return true;
                } else {
                    set.add(obj);
                }
                return checkLinkCycles(obj[key]);
            }
        }

        return false;
    })(obj);
}

// let obj = {
//     one: 1,
//     two: 2,
//     three: 3,
//     param: "aaa",
//     foo: {
//         bar: 2,
//         bar2: 2,
//         bar3: 3,
//         bar4: {
//             a: 5,
//         },
//     },
//     car: ["a"],
// };

// obj.foo.bar4.a = obj;

console.log(foo(obj));
