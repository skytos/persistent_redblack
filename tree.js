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
                right: right.right,
            } :
        t
}

find = (x, t) =>
    !!t && (
        x === t.val ||
        x < t.val && find(x, t.left) ||
        x > t.val && find(x, t.right)
    )

rotLeft = ({val, right, left}) => (
    {...right, left: {val, left, right: right.left}}
)

rotRight = ({val, right, left}) => (
    {...left, right: {val, right, left: left.right}}
)

// tests
nums = [7,6,5,4,3,2,1]
t = nums.reduce((t, x) => insert(x, t), null)
console.log(t)
console.log(nums.map(x => find(x, t)))
