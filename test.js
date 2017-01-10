
function Menu() {
	var items = [
		{
			'url' : '#',
			'title' : 'Home'
		},
		{
			'url' : '#',
			'title' : 'About'
		},
		{
			'url' : '#',
			'title' : 'Content'
		}
	];
	Mig.render(Mig.create('nav', { id : 'main-nav'}, [
		Mig.create('ul', items.map(function(item) {
			return Mig.create('li', [
				Mig.create('a', {'href': item.url}, [item.title])
			]);
		}))
	]), document.getElementById('main'));
}

console.time('menu');
Menu();
console.timeEnd('menu');

var Post = function(data) {
	return Mig.create('div', {'class' : 'post'}, [
		Mig.create('h2', {'class' : 'title'}, [data.title]),
		Mig.create('div', {'class' : 'content'}, [data.body])
	]);
}

Mig.json({
	url: 'https://jsonplaceholder.typicode.com/posts'
})
.then(function(posts) {
	// console.log('data', posts);
	console.time('render');

	Mig.render(Mig.create('div', { class: 'posts' }, posts.map(function(post) {
		return Post(post);
	})), document.getElementById('main'));
	console.timeEnd('render');
});
