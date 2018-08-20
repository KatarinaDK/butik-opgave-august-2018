const User = require('../services/users');

module.exports = (app) => {
	app.get('/login', async (req, res) => {
		try {
			res.render('admin/login', {
				siteTitle: 'Eksamens Template',
				pageTitle: 'Login',
				message: ''
			});
		} catch (e) {
			res.send(`'Der skete en fejl: '${e.name}`);
			console.log(e.name);
		  }
	});

	app.post('/login', async (req, res) => {
		try {
			const validate = await User.validate(req.body.brugernavn, req.body.password);
			console.log(validate);
			
			if (validate && validate.status == true) {
				req.session.isLoggedIn = { id: validate.userId };
				res.redirect('/admin');
			} else {
				req.session.isLoggedIn = false;
				console.log(validate.besked);
				res.render('admin/login', {
					siteTitle: 'Eksamens Template',
					pageTitle: 'Login',
					message: validate.besked
				});
			}
		} catch (e) {
			// Man bør aldrig nå ned til denne catch, da Promisen i User.validate kun indeholder resolve()
			req.session.isLoggedIn = false;
			console.log(validate.besked);
		}
	});

	app.get('/logout', (req, res) => {
		req.session.destroy((err) => { // Sletter al data i session
			res.redirect('/');
		})
	})
}; 
