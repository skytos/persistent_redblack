insert = (x, t) => {
    let ins = t =>
        !t ? {val: x, red: true} :
        x < t.val ? balance({...t, left: ins(t.left)}) :
        x === t.val ? t :
        balance({...t, right: ins(t.right)})
    return {...ins(t), red: false}
}

balance = t => {
    let {val, left, right, red} = t
    return red ? t :
        (left?.red && left.left?.red) ?
            {
                val: left.val,
                red: true,
                left: {...left.left, red: false},
                right: {...t, left: left.right},
            } :
        (left?.red && left.right?.red) ?
            {
                val: left.right.val,
                red: true,
                left: {...left, red: false, right: left.right.left},
                right: {...t, left: left.right.right},
            } :
        (right?.red && right.left?.red) ?
            {
                val: right.left.val,
                red: true,
                left: {...t, right: right.left.left},
                right: {...right, red: false, left: right.left.right},
            } :
        (right?.red && right.right?.red) ?
            {
                val: right.val,
                red: true,
                left: {...t, right: right.left},
                right: {...right.right, red: false},
            } :
        t
}

find = (x, t) =>
    !!t && (
        x === t.val ||
        x < t.val && find(x, t.left) ||
        x > t.val && find(x, t.right)
    )

print = (t, d = 0) => {
    if (t) {
        print(t.left, d+1)
        console.log( ' '.repeat(2*d) + t.val + '  ' + (t.red?'R':'B'))
        print(t.right, d+1)
    }
}

rotLeft = ({val, right, left}) => (
    {...right, left: {val, left, right: right.left}}
)

rotRight = ({val, right, left}) => (
    {...left, right: {val, right, left: left.right}}
)

depth = t => t ? 1 + Math.max(depth(t.left), depth(t.right)) : 0

// tests
// balance = t => t
t = null
for (let i = 0; i < 10000; i++) t = insert(i, t)
console.log(depth(t))
