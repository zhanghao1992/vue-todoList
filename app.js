/*var listData = [{
	title: '000000',
	completed: false,
	id: 1
}, {
	title: '111111',
	id: 2,
	completed: false
}, {
	title: '2222222',
	completed: true,
	id: 3
}];*/

var store = {
	setListData: function(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	},
	getListData: function(key) {
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}


var demo = new Vue({
	el: '#demo',
	data: {
		listData: store.getListData('listData'),
		addText: "",
		oldItem: {},
		filter: "0",
		editing: "",
		visibility: "all"
	},
	watch: {
		listData: {
			handler: function() {
				store.setListData('listData', this.listData);
			},
			deep: true
		}
	},
	methods: {
		addHandle: function(e) {
			console.log(e.target.value)
			this.listData.push({
				title: this.addText,
				completed: false,
				id: new Date().getTime()
			});
			this.addText = '';
		},
		dbclickHandle: function(item) {
			this.oldItem = item;
			this.editing = item;
			console.log(this.oldItem);
			console.log(this.oldItem.title);
		},
		blurHandle: function() {
			this.editing = '';
		},

		escHandle: function(item) {
			console.log(this.oldItem);
			console.log(this.oldItem.title);
			item.title = this.oldItem.title;
			this.editing = '';
			this.oldItem = '';
		},
		fn: function() {
			console.log(this.oldItem.title);
		},


		changeHandle: function(item) {
			var index = this.listData.indexOf(item);
			this.listData[index].completed = !this.listData[index].completed;
		},
		deleteHandle: function(item) {
			console.log(item)
			var index = this.listData.indexOf(item);
			this.listData.splice(index, 1);

		}
	},
	computed: {
		noCompletedLength: function() {
			return this.listData.filter(function(item) {
				return !item.completed;
			}).length;
		},
		filterList: function() {
			//数据过滤

			var filter = {
				all: function(listData) {
					return listData;
				},
				completed: function(listData) {
					return listData.filter(function(item) {
						return item.completed;
					});
				},
				unCompleted: function(listData) {
					return listData.filter(function(item) {
						return !item.completed;
					});
				}
			}
			return filter[this.visibility] ? filter[this.visibility](this.listData) : this.listData;
		}
	},
	directives: {
		"focus": {
			update: function(el, binding) {
				// console.log(el);
				// console.log(binding);
				if (binding.value) {
					el.focus();
				}
			}
		}
	}
})

function getHash() {
	var hash = window.location.hash.slice(1);
	// console.log(hash);
	demo.visibility = hash;
}
getHash();
window.addEventListener('hashchange', getHash);