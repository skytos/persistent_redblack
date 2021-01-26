add = (x, t) =>
    !t ? {val: x} :
    x === t.val ? t :
    x < t.val ? {...t, left: add(x, t.left)} :
    {...t, right: add(x, t.right)}

find = (x, t) =>
    !!t && (
        x === t.val ||
        x < t.val && find(x, t.left) ||
        x > t.val && find(x, t.right)
    )

nums = [1,5,4,7,6]
outnums = [2,8,3,0]
t = nums.reduce((t, x) => add(x, t), null)
console.log(t)
console.log(nums.map(x => find(x, t)))
console.log(outnums.map(x => find(x, t)))
