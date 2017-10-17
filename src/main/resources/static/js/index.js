$(document).ready(function() {

	setInterval(function() {
		$.ajax({
			method : 'GET',
			url : '/api/expired-tokens'
		}).then(function(res) {
			if (res.length > 0) {
				$.ajax({
					method: 'GET',
					url: '/api/logout-token/' + res[0].userId
				}).then(function(response) {});
			}
		});
	}, 60000);

});