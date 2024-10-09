const options = {
	keys: [
		'title',
		'contents'
	]
};
const paginate = 10;
const summaryLength = 90;
const pattern = param('q');
if (pattern) {
	fetch('/index.json')
		.then(response => response.ok ? response.json() : undefined)
		.then(search);
}

function search(json) {
	let fuse = new Fuse(json, options);
	let result = fuse.search(pattern);
	let elem = document.querySelector('#search-results');
	if (result.length > 0) {
		let maxpage = Math.ceil(result.length / paginate);
		let paged = param('p');
		if (!paged || paged < 1) {
			paged = 1;
		}
		if (paged > maxpage) {
			paged = maxpage;
		}
		let start = (paged - 1) * paginate;
		let html = '';
		for (let i = start; i < start + 10; i++) {
			if (!result[i]) continue;
			let data = result[i].item;
			html += '<article class="entry">';
			html += '<h1><a href="' + data.permalink + '">' + data.title + '</a></h1>';
			html += '<p>' + data.contents.substring(0, summaryLength) + '&hellip;</p>';
			html += '</article>';
		}
		html += pagination(maxpage, paged, pattern);
		elem.innerHTML = html;
	} else {
		elem.innerHTML = '<p>没有找到结果，可能你要搜索的内容已逃离地球</p>';
	}
}

function param(name) {
	let url = new URL(window.location);
	return url.searchParams.get(name);
}

function pagination(maxpage, paged, pattern) {
	if (maxpage <= 1) return '';
	paged = parseInt(paged);
	let baseurl = '/search/?q=' + pattern;
	let pagination = '<ul class="pagination">';
	if (paged > 1) {
		pagination += '<li class="prev"><a href="' + baseurl + '&p=' + (paged - 1) + '">&laquo;</a></li>';
	} else {
		pagination += '<li class="prev disabled">&laquo;</li>';
	}
	let minpage = paged - 2;
	if (minpage > maxpage - 4) minpage = maxpage - 4;
	if (minpage < 1) minpage = 1;
	for (let i = minpage; i < minpage + 5; i++) {
		if (i > maxpage) break;
		if (i == paged) {
			pagination += ' <li class="disabled">' + i + '</li> ';
		} else {
			pagination += ' <li><a href="' + baseurl + '&p=' + i + '">' + i + '</a></li> ';
		}
	}
	if (paged < maxpage) {
		pagination += '<li class="next"><a href="' + baseurl + '&p=' + (paged + 1) + '">&raquo;</a></li>';
	} else {
		pagination += '<li class="next disabled">&raquo;</li>';
	}
	pagination += '</ul>';
	return pagination;
}