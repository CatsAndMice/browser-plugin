function getBookmarksMap(bookmarks, bookmarksMap) {
    if (bookmarks) {
        const { title } = bookmarks
        let children = bookmarks.children || []
        for (let i = 0; i < children.length; i++) {
            const { title: childrenTitle, url: childrenUrl = "" } = children[i]
            if (childrenTitle && childrenUrl) {
                const bookmarksMapValue = bookmarksMap.get(title)
                if (bookmarksMapValue) {
                    bookmarksMapValue.push(children[i])
                } else {
                    bookmarksMap.set(title, [children[i]])
                }
            } else {
                //递归调用
                getBookmarksMap(children[i], bookmarksMap)
            }
        }
    }

    return bookmarksMap
}

function getChildren(bookmarks = []) {
    return bookmarks.map((bookmark) => {
        const { title, url } = bookmark
        return `<a href="${url}">${title}</a><br/>`
    }).join('')
}

/**
 * 1.铺平浏览器已有的所有书签，层级只保留一层
 */
window.onload = () => {
    chrome.bookmarks.getTree((bookmarks) => {
        const bookmarkChildren = bookmarks[0]
        if (!bookmarkChildren) return
        const bookmarksMap = getBookmarksMap(bookmarkChildren, new Map())
        const body = $('body')
        bookmarksMap.forEach((bookmarks, title) => {
            const contain = $(`<div><h2>${title}</h2><div/>`)
            const children = getChildren(bookmarks)
            contain.append(children)
            body.append(contain)
        })
    })
}
