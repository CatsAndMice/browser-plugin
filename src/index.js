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


/**
 * 1.铺平浏览器已有的所有书签，层级只保留一层
 */
window.onload = () => {
    chrome.bookmarks.getTree((bookmarks) => {
        const bookmarkChildren = bookmarks[0]
        if (!bookmarkChildren) return
        const bookmarksMap = getBookmarksMap(bookmarkChildren, new Map())
    })
}
