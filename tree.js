add = (t, x) =>
    !t ? {val: x} :
    x === t.val ? t :
    x < t.val ? {...t, left: add(t.left, x)} :
    {...t, right: add(t.right, x)}

find = (t, x) =>
    !!t && (
        x === t.val ||
        x < t.val && find(t.left, x) ||
        x > t.val && find(t.right, x)
    )

