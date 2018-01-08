var express = require('express');
var router = express.Router();
var passport = require("passport");
var GithubStrategy = require("passport-github").Strategy;

passport.serializeUser(function (user, done) {
    // console.log('---serializeUser---');
    // console.log(user);
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    // console.log('---deserializeUser---');
    // console.log(obj)
    done(null, obj);
});

passport.use(new GithubStrategy({
    // clientID: clientID,
    // clientSecret: clientSecret,
    // callbackURL: "http://localhost:3000/auth/github/callback"
    clientID: '33b923135630fce3f0a6',
    clientSecret: 'b15bba7f5be2e8cbece3aa143d78732f50aa5219',
    callbackURL: "http://www.expressnotes.top/auth/github/callback"
}, function (accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    // });
    done(null, profile);
}));

router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/');
});

router.get('/github', passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        // console.log("success111111111111111.success.................success.................success.................")
        // console.log(req.user);
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider
        };
        // console.log("success..2222222222222222222success.................success.................success.................")
        res.redirect('/');
    });

module.exports = router;