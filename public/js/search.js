// 初始化 Lunr.js
var idx = null;
var searchData = null;

fetch('/search.json')
    .then(response => response.json())
    .then(data => {
        // 建立 Lunr.js 索引
        searchData = data;
        idx = lunr(function () {
            this.ref('permalink');
            this.field('title');
            this.field('content');
            this.field('summary');

            data.forEach(function (doc) {
                this.add(doc);
            }, this);
        });
    });

// 搜索处理
document.getElementById('search-input').addEventListener('input', function() {
    var query = this.value.trim();
    var resultsContainer = document.getElementById('results');

    // 清空搜索结果
    resultsContainer.innerHTML = '';

    if (idx && query) {
        var results = idx.search(query); // Lunr.js 搜索

        if (results.length > 0) {
            results.forEach(function (result) {
                var item = searchData.find(post => post.permalink === result.ref);
                var li = document.createElement('li');
                li.innerHTML = `<a href="${item.permalink}">${item.title}</a><p>${item.summary}</p>`;
                resultsContainer.appendChild(li);
            });
        } else {
            resultsContainer.innerHTML = '<li>No results found</li>';
        }
    }
});
